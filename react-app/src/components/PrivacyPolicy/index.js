import React, {useState, useEffect, useContext} from 'react'
import ReactDom from 'react-dom'
import {useHistory} from 'react-router-dom';
import { ModalContext } from '../../context/Modal/Modal';

import logo from '../../static/DanceFamBrushNoText.svg';
import '../../context/Modal/Modal.css';

export default function PrivacyPolicy() {
  const history = useHistory();

  const modalNode = useContext(ModalContext);

  const [htmlFileString, setHtmlFileString] = useState();

  async function fetchHtml() {
    setHtmlFileString(await (await fetch('/privacy-policy.html')).text());
  }
  useEffect(() => {
    fetchHtml();
  }, []);

  if (!modalNode) return null;




  return ReactDom.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={()=>{
        history.push('/app')}} />
        <div id="modal-container">
          <div id='modal-header'>
            <img id='modal-logo' alt='logo' src={logo}/>
            Privacy Policy
            <div
              id='modal-close-button'
              onClick={()=> {
                history.push('/app')
              }}
              >
              <i className="fa-solid fa-x"></i>
            </div>
          </div>
          <div id='modal-content'>
            <div dangerouslySetInnerHTML={{__html: htmlFileString}}></div>
          </div>
        </div>
    </div>,
    modalNode
  );
};
