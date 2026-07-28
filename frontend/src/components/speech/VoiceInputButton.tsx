import { Mic, Square, Loader2 } from "lucide-react";
import { useRef, useState } from "react";

interface Props {
  onTranscript: (text: string) => Promise<void> | void;
}

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

export default function VoiceInputButton({
  onTranscript,
}: Props) {
  const [listening, setListening] = useState(false);
  const [processing, setProcessing] = useState(false);

  const recognitionRef = useRef<any>(null);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
      console.log("🎤 Recording Started...");
    };

    recognition.onresult = async (event: any) => {
      let finalTranscript = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        if (event.results[i].isFinal) {
          finalTranscript +=
            event.results[i][0].transcript + " ";
        }
      }

      finalTranscript = finalTranscript.trim();

      if (!finalTranscript) return;

      console.log("📝 Transcript:", finalTranscript);

      setProcessing(true);

      try {
        await onTranscript(finalTranscript);
      } finally {
        setProcessing(false);
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech Error:", event.error);
      setListening(false);
      setProcessing(false);
    };

    recognition.onend = () => {
      console.log("🛑 Recording Stopped");
      setListening(false);
    };

    recognitionRef.current = recognition;

    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
  };

  return (
    <button
      type="button"
      disabled={processing}
      onClick={
        listening
          ? stopListening
          : startListening
      }
      className={`flex min-w-[190px] items-center justify-center gap-2 rounded-xl px-5 py-3 font-medium text-white shadow-sm transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-70 ${
        processing
          ? "bg-blue-600"
          : listening
          ? "bg-red-600 hover:bg-red-700"
          : "bg-green-600 hover:bg-green-700"
      }`}
    >
      {processing ? (
        <>
          <Loader2
            size={18}
            className="animate-spin"
          />
          AI Processing...
        </>
      ) : listening ? (
        <>
          <Square size={18} />
          Stop Recording
        </>
      ) : (
        <>
          <Mic size={18} />
          Voice Input
        </>
      )}
    </button>
  );
}