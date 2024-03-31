FROM python:3-slim
WORKDIR /usr/src/app/zoom_microservice
COPY requirements.txt ./
RUN python -m pip install --no-cache-dir -r requirements.txt
COPY ["zoom.py", "./"]
CMD [ "python", "-u", "./zoom.py" ]