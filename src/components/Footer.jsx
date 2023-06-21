import React from 'react';

function Header({ position }) {
  return (
    <footer className={position}>
      <a href='https://github.com/Abrosss/devquiz-quiz-app' target='_blank'>
        <img
          className='icon'
          src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg'
        />
      </a>
    </footer>
  );
}

export default Header;
