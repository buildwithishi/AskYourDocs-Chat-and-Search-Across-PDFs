from pathlib import PurePosixPath

ALLOWED_EXTENSIONS: dict[str, str] = {
    "pdf": "application/pdf",
    "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "txt": "text/plain",
    "md": "text/markdown",
}


def resolve_extension(filename: str) -> str:
    return PurePosixPath(filename).suffix.lower().lstrip(".")


def mime_type_for(extension: str) -> str:
    return ALLOWED_EXTENSIONS[extension]
