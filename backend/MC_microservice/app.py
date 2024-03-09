from flask import Flask, render_template, request, Response, send_file
from io import BytesIO
from reportlab.pdfgen import canvas

app = Flask(__name__)

# Initialize an empty list to store user input data
user_data = []


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/generate-pdf", methods=["GET", "POST"])
def generate_pdf():
    if request.method == "POST":
        # Retrieve user input from the form
        title = request.form.get("title")
        author = request.form.get("author")
        publication_year = request.form.get("publication_year")

        # Validate and store the user input
        if title and author and publication_year:
            user_data.append(
                {"title": title, "author": author, "publication_year": publication_year}
            )

    pdf_file = generate_pdf_file()
    return send_file(pdf_file, as_attachment=True, download_name="Medical_Certificate.pdf")


def generate_pdf_file():
    buffer = BytesIO()
    p = canvas.Canvas(buffer)

    # Create a PDF document
    p.drawString(100, 750, "Book Catalog")

    y = 700
    for book in user_data:
        p.drawString(100, y, f"Title: {book['title']}")
        p.drawString(100, y - 20, f"Author: {book['author']}")
        p.drawString(100, y - 40, f"Year: {book['publication_year']}")
        y -= 60

    p.showPage()
    p.save()

    buffer.seek(0)
    return buffer


if __name__ == "__main__":
    app.run(debug=True)
