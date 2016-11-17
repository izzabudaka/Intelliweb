from nltk.tag import StanfordNERTagger


class EntityRecognizer:
    def __init__(self):
        self.tagger = StanfordNERTagger(
            '/Users/izzabudaka/hackathons/Facebook_Global_Finals/stanford-ner/classifiers/english.all.3class.distsim.crf.ser.gz',
            '/Users/izzabudaka/hackathons/Facebook_Global_Finals/stanford-ner/stanford-ner.jar')

    def get_entities(self, email_txt):
        entities = self.tagger.tag(email_txt.split())
        print(entities)
        return entities
