from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

class FallbackHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        path = self.path.split("?", 1)[0]

        known_files = {
            "/",
            "/index.html",
            "/styles.css",
            "/script.js",
            "/thank-you.html",
            "/polityka-prywatnosci.html",
            "/regulamin.html",
            "/_redirects",
            "/netlify.toml",
        }

        if path in known_files or path.startswith("/assets/"):
            return super().do_GET()

        # fallback dla adresów typu /ABC_Sp._z_o.o.
        if not Path("." + path).exists():
            self.path = "/index.html"

        return super().do_GET()

if __name__ == "__main__":
    server = ThreadingHTTPServer(("localhost", 5173), FallbackHandler)
    print("Local server running at http://localhost:5173")
    print("Personalized test: http://localhost:5173/ABC_Sp._z_o.o.")
    server.serve_forever()
