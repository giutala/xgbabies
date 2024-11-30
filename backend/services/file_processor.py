from fastapi import UploadFile
import csv
import io

class FileProcessor:
    async def process_file(self, file: UploadFile | None) -> str:
        if not file:
            return ""

        content = await file.read()
        text_content = content.decode('utf-8')

        if file.filename.endswith('.csv'):
            return self._process_csv(text_content)
        else:
            return text_content

    def _process_csv(self, content: str) -> str:
        output = []
        reader = csv.reader(io.StringIO(content))
        headers = next(reader)  # Get headers

        for row in reader:
            row_dict = dict(zip(headers, row))
            output.append(row_dict)

        return str(output)  # Convert to string format for LLM processing