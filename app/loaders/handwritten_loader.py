import warnings

import cv2
import easyocr
import fitz
import numpy as np

from PIL import Image
from langchain_core.documents import Document

# Suppress PyTorch pin_memory warning when running without GPU
warnings.filterwarnings(
    "ignore",
    message=".*pin_memory.*",
    category=UserWarning,
)


class HandwrittenLoader:
    """
    OCR loader for handwritten PDFs and images.
    Returns LangChain Documents so it integrates
    seamlessly with the ingestion pipeline.
    """

    def __init__(self):

        self.reader = easyocr.Reader(
            ["en"],
            gpu=False,
        )

    def preprocess(self, image: np.ndarray) -> np.ndarray:
        """
        Light preprocessing.

        EasyOCR already performs its own preprocessing.
        Heavy thresholding usually reduces handwriting accuracy.
        """

        return image

    def extract_image(self, image_path: str) -> list[Document]:

        image = cv2.imread(image_path)

        if image is None:
            raise FileNotFoundError(image_path)

        processed = self.preprocess(image)

        results = self.reader.readtext(
            processed,
            detail=1,
            paragraph=True,
        )

        text = "\n".join(
            result[1]
            for result in results
        )

        return [
            Document(
                page_content=text,
                metadata={
                    "source": image_path,
                    "page": 1,
                },
            )
        ]

    def extract_pdf(self, pdf_path: str) -> list[Document]:

        pdf = fitz.open(pdf_path)

        pages = []

        print(f"Extracting {len(pdf)} pages...")

        for page_number in range(len(pdf)):

            print(
                f"Processing page {page_number + 1}/{len(pdf)}..."
            )

            page = pdf[page_number]

            # 200 DPI is much faster on CPU while
            # still giving reasonable OCR quality.
            pix = page.get_pixmap(dpi=200)

            image = Image.frombytes(
                "RGB",
                [pix.width, pix.height],
                pix.samples,
            )

            image = np.array(image)

            image = cv2.cvtColor(
                image,
                cv2.COLOR_RGB2BGR,
            )

            processed = self.preprocess(image)

            results = self.reader.readtext(
                processed,
                detail=1,
                paragraph=True,
            )

            page_text = "\n".join(
                result[1]
                for result in results
            )

            pages.append(
                Document(
                    page_content=page_text,
                    metadata={
                        "source": pdf_path,
                        "page": page_number + 1,
                    },
                )
            )

        pdf.close()

        return pages


# Create a single loader instance
loader = HandwrittenLoader()


def load_handwritten(file_path: str) -> list[Document]:
    """
    Public API used by the ingestion service.
    """

    if file_path.lower().endswith(".pdf"):
        return loader.extract_pdf(file_path)

    return loader.extract_image(file_path)