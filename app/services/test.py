from pathlib import Path
import sys

PROJECT_ROOT = Path(__file__).resolve().parents[2]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from app.loaders.handwritten_loader import EasyOCRService


def main() -> None:
    pdf_path = Path(r"C:\Users\niran\Downloads\ESS-UNIT-4 NOTES.pdf")

    if not pdf_path.exists():
        raise FileNotFoundError(f"PDF not found: {pdf_path}")

    ocr = EasyOCRService()
    docs = ocr.extract_pdf(str(pdf_path))

    for doc in docs:
        print("=" * 80)
        print(doc.metadata)
        print(doc.page_content)


if __name__ == "__main__":
    main()