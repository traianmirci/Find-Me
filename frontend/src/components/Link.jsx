import React from 'react';

function Link({ link }) {
  return (
    <a href={`${link.link}`}>
      <div className='link-container d-flex p-3 mb-3 bg-white rounded shadow'>
        <div className='icon'>
          <i class='fas fa-user fa-lg p-2'></i>
        </div>
        <div className='title my-auto mx-auto text-center'>{link.title}</div>
      </div>
    </a>
  );
}

export default Link;
