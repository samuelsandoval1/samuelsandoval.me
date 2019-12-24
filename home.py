import webapp2
import jinja2
import os

env = jinja2.Environment(
    loader = jinja2.FileSystemLoader(os.path.dirname(__file__)))

class MainHandler(webapp2.RequestHandler):
    def get(self):
        template = env.get_template('templates/home.html')
        self.response.write(template.render())

class AboutHandler(webapp2.RequestHandler):
    def get(self):
        template = env.get_template('templates/about.html')
        self.response.write(template.render())

class PortfolioHandler(webapp2.RequestHandler):
    def get(self):
        template = env.get_template('templates/portfolio.html')
        self.response.write(template.render())

class ContactHandler(webapp2.RequestHandler):
    def get(self):
        template = env.get_template('templates/contact.html')
        self.response.write(template.render())


app = webapp2.WSGIApplication([
    ('/' , MainHandler),
    ('/about' , AboutHandler),
    ('/portfolio' , PortfolioHandler),
    ('/contact' , ContactHandler),
], debug = True)
