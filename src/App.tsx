import React, {useEffect, useRef} from 'react';
import './App.css';

function App() {
    const elements = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        if (elements.current.length){
            window.requestAnimationFrame(()=>{
                elements.current.forEach(el=>{
                    if (isElementInViewport(el)) {
                        el.style.transform =  'scale(100%)'
                    } else {
                        el.style.transform =  'scale(90%)'                    }
                })
            });
        }
    }, []);

    function isElementInViewport (el: HTMLDivElement) {
        const rect = el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
        );
    }
    let start = useRef<number>();
    let previousTimeStamp =  useRef<number>();
    let startB = useRef<number>();
    let previousTimeStampB =  useRef<number>();
    const hide = useRef<HTMLDivElement>(null);
    function animateWidthSmaller(el: HTMLDivElement, duration: number) {
        function step(timeStamp: number) {
            if (startB.current === undefined) {
                startB.current = timeStamp;
            }
            const elapsed = timeStamp - startB.current;

            if (previousTimeStamp.current !== timeStamp) {
                const progress = Math.min(elapsed / duration, 1); // Ensure the progress does not exceed 1

                const currentWidth = 100 - progress * 10; // Animate from 100% to 70%
                el.style.transform = `scale(${currentWidth}%)`;
            }

            if (elapsed < duration) {
                previousTimeStampB.current = timeStamp;
                window.requestAnimationFrame(step);
            }
        }

        window.requestAnimationFrame(step);
    }
    function animateHideSmaller(el: HTMLDivElement, duration: number) {
        function step(timeStamp: number) {
            if (startB.current === undefined) {
                startB.current = timeStamp;
            }
            const elapsed = timeStamp - startB.current;

            if (previousTimeStamp.current !== timeStamp) {
                const progress = Math.min(elapsed / duration, 1); // Ensure the progress does not exceed 1

                const currentHeight = 100 - progress * 40; // Animate from 100% to 70%
                el.style.height =   `${currentHeight}vh`;
                el.style.opacity ='0.3'
            }

            if (elapsed < duration) {
                previousTimeStampB.current = timeStamp;
                window.requestAnimationFrame(step);
            }
        }

        window.requestAnimationFrame(step);
    }
    function animateHideLarger(el: HTMLDivElement, duration: number) {
        function step(timeStamp: number) {
            if (start.current === undefined) {
                start.current = timeStamp;
            }
            const elapsed = timeStamp - start.current;

            if (previousTimeStamp.current !== timeStamp) {
                const progress = Math.min(elapsed / duration, 1); // Ensure the progress does not exceed 1
                const currentHeight = 100 ; // Animate from 100% to 70%
                el.style.height =   `${currentHeight}vh`;
                el.style.opacity ='1'
            }

            if (elapsed < duration) {
                previousTimeStamp.current = timeStamp;
                window.requestAnimationFrame(step);
            }
        }

        window.requestAnimationFrame(step);
    }
    function animateWidthLarger(el: HTMLDivElement, duration: number) {
        function step(timeStamp: number) {
            if (start.current === undefined) {
                start.current = timeStamp;
            }
            const elapsed = timeStamp - start.current;

            if (previousTimeStamp.current !== timeStamp) {
                const progress = Math.min(elapsed / duration, 1); // Ensure the progress does not exceed 1
                const currentWidth = 90 + progress * 10; // Animate from 70% to 100%
                el.style.transform = `scale(${currentWidth}%)`;
            }

            if (elapsed < duration) {
                previousTimeStamp.current = timeStamp;
                window.requestAnimationFrame(step);
            }else {
                // el.scrollIntoView()
            }
        }

        window.requestAnimationFrame(step);
    }
    const  bdsd = useRef<HTMLDivElement>(null)
    const  toTop= useRef( false)
    const  bottom= useRef( 0)
    useEffect(() => {

        if (bdsd.current)
        bottom.current = bdsd.current.getBoundingClientRect().bottom
    }, [bdsd]);
    const  currentElem = useRef(0)
    useEffect(() => {
window.addEventListener("scrollend", ()=>{
    console.log(currentElem.current)
    if (elements.current.length)
elements.current[currentElem.current].scrollIntoView({behavior: 'smooth'})
})
        window.addEventListener('scroll', ()=>{
            if (hide.current) {
                if (hide.current && hide.current.getBoundingClientRect().top >= 0) {
                    animateHideLarger(hide.current, 500)
                } else {
                    animateHideSmaller(hide.current, 500)
                }
            }
            if (bdsd.current) {
                toTop.current = bdsd.current.getBoundingClientRect().bottom > bottom.current
                bottom.current = bdsd.current.getBoundingClientRect().bottom
            }
if (!bdsd.current) return;
   currentElem.current=  Math.round((bdsd.current.getBoundingClientRect().height - bottom.current)/ (bdsd.current.getBoundingClientRect().height/5))

            elements.current.forEach((el, index, array)=> {
                    if (index===currentElem.current){
                        animateWidthLarger(el, 1000)

                    }else if ( Math.abs(index-currentElem.current)===1 ) {
                        animateWidthSmaller(el, 1000)
                    }
                })

        })
    }, []);
const arr = Array.from(Array(5).keys())
  return (
      <div>
          <div className="container" ref={bdsd}>
              <div className="block absolute" ref={(el: HTMLDivElement)=> elements.current[0] = el}>
                  <p>
                      dd
                      d
                      d
                      da
                      da
                      da
                      d
                      ad
                      ad
                      adada
                      waw
                      d
                      adw
                      ad
                      wa
                      What is Lorem Ipsum?
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                      the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                      type and scrambled it to make a type specimen book. It has survived not only five centuries, but
                      also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in
                      the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                      with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                      Why do we use it?
                      It is a long established fact that a reader will be distracted by the readable content of a page
                      when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                      distribution of letters, as opposed to using 'Content here, content here', making it look like
                      readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as
                      their default model text, and a search for 'lorem ipsum' will uncover many web sites still in
                      their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on
                      purpose (injected humour and the like).


                      Where does it come from?
                      Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
                      classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin
                      professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words,
                      consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical
                      literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
                      of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
                      This book is a treatise on the theory of ethics, very popular during the Renaissance. The first
                      line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

                      The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                      Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                      their exact original form, accompanied by English versions from the 1914 translation by H.
                      Rackham.

                      Where can I get some?
                      There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                      alteration in some form, by injected humour, or randomised words which don't look even slightly
                      believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't
                      anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet
                      tend to repeat predefined chunks as necessary, making this the first true generator on the
                      Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence
                      structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore
                      always free from repetition, injected humour, or non-characteristic words etc.
                  </p>
              </div>

              { arr.splice(1).map((elem, i) => {
                  return <div key={elem} className="block" ref={(el: HTMLDivElement) => elements.current[elem] = el}>
                      <div className="block-inner">Block {i + 1}</div>
                  </div>
              })}


          </div>
      </div>
  );
}

export default App;

