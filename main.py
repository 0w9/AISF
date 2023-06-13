from fastapi import FastAPI
from pytube import YouTube
import replicate

app = FastAPI()

class YoutubeVideoProcessor:
    def __init__(self, url):
        self.url = url
        self.path = None

    def downloadMp3(self):
        print("Downloading mp3...")
        self.path = YouTube(self.url, use_oauth=True, allow_oauth_cache=True).streams.filter(only_audio=True).first().download()
        print("Downloaded to " + self.path + "\n")
        return self.path
    
    def transcribe(self):
        print("Transcribing...")
        # return the model call

@app.post("/process-video")
async def process_video(url: str):
    try:
        processor = YoutubeVideoProcessor(url)
        processor.downloadMp3()
        output = processor.transcribe()
        return {"status": "success", "output": output}
    except Exception as e:
        return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)