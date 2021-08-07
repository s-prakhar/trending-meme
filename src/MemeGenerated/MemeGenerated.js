import React, { useState } from "react";
import styles from "./styles.module.css";
import { useHistory, useLocation } from "react-router-dom";
import { useClipboard } from "use-clipboard-copy";

export const MemeGenerated = () => {
  const [copied, setCopied] = useState(false);

  const clipboard = useClipboard();
  const history = useHistory();
  const location = useLocation();
  const url = new URLSearchParams(location.search).get("url");

  const copyLink = () => {
    clipboard.copy(url);
    setCopied(true);
  };
  async function downloadImage() {
    const imageSrc = url;
    const image = await fetch(imageSrc);
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);

    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "GenratedMeme";
    link.click();
  }

  return (
    <div className={styles.container}>
      <button onClick={() => history.push("/")} className={styles.home}>
        Make More Memes
      </button>
      {url && <img alt="meme" src={url} />}
      <button onClick={copyLink} className={styles.copy}>
        {copied ? "Link copied!" : "Copy link"}
      </button>
      <button onClick={downloadImage} className={styles.copy}>
        Download
      </button>
    </div>
  );
};
