import React, {useState, useEffect} from 'react'



export default function PrivacyPolicy() {
  const [htmlFileString, setHtmlFileString] = useState('');

  async function fetchHtml() {
    setHtmlFileString(await (await fetch('privacy-policy.html')).text());
  }

  useEffect(() => {
    fetchHtml();
  }, []);

  return (
    <div dangerouslySetInnerHTML={{__html: htmlFileString}}></div>
  )
}
