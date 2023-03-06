import React, {useEffect} from 'react';

export default function RightBar() {
  useEffect(() => {
    const pushAd = () => {
      try {
        const adsbygoogle = window.adsbygoogle
        adsbygoogle.push({})
      } catch (e) {
        console.error(e)
      }
    }

    let interval = setInterval(() => {
      // Check if Adsense script is loaded every 300ms
      if (window.adsbygoogle) {
        pushAd()
        // clear the interval once the ad is pushed so that function isn't called indefinitely
        clearInterval(interval)
      }
    }, 300)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className='right-bar'>
        <ins className="adsbygoogle"
            style={{"display":"block"}}
            data-ad-client="ca-pub-6254698020872115"
            data-ad-slot="6532873315"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
    </div>
  )
}
