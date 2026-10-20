FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
# banking app use port 5090 now, run with -p 5090:5090
EXPOSE 5090
RUN useradd -m appuser
USER appuser
CMD ["gunicorn", "--bind", "0.0.0.0:5090", "app:app"]
