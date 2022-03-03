FROM python:3.6
WORKDIR /app
COPY . .
EXPOSE 8000
RUN  chmod +x entrypoint.sh && \
    pip install -r ./requirements.txt
ENV POSTGRES_USER=postgres POSTGRES_PASSWORD=postgres POSTGRES_SERVER=postgres POSTGRES_PORT=5432 POSTGRES_DB=postgres   
CMD ["./entrypoint.sh"]