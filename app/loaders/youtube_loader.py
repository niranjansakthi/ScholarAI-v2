from langchain_community.document_loaders import YoutubeLoader

def load_youtube(url):
    loader = YoutubeLoader.from_youtube_url(url)
    return loader.load()