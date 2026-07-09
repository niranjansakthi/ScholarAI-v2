import os
from fastapi import UploadFile


async def file_saver(uploaded_file: UploadFile) -> str:
    temp_dir = "temp"

    os.makedirs(temp_dir, exist_ok=True)

    filename = uploaded_file.filename or "uploaded_file"
    safe_name = os.path.basename(filename)
    file_path = os.path.join(temp_dir, safe_name)

    with open(file_path, "wb") as buffer:
        while True:
            chunk = await uploaded_file.read(1024 * 1024)
            if not chunk:
                break
            buffer.write(chunk)

    return os.path.abspath(file_path)
