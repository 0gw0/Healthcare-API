FROM python:3-slim
WORKDIR /usr/src/app/create_delivery_complex_microservice
COPY requirements.txt ./
RUN python -m pip install --no-cache-dir -r requirements.txt
COPY ["create_delivery.py", "invokes.py", "./"]
CMD [ "python", "-u", "./create_delivery.py" ]