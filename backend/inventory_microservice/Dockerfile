FROM python:3-slim
WORKDIR /usr/src/app/inventory_microservice
COPY requirements.txt ./
RUN python -m pip install --no-cache-dir -r requirements.txt
COPY ["inventory.py", "./"]
COPY ["database", "./database"]
CMD [ "python", "-u", "./inventory.py" ]