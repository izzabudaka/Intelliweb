from wikipedia import wikipedia

class WikipediaFetcher():

    def getAbout(self, title):
        page = wikipedia.page(title)
        return Message(
            content=wikipedia.summary(target, sentences=2) + "<br/><br/>Read more at " + page.url,
            msg_type=MessageType.image,
            payload=images[0]
        )