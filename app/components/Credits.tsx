import BiGithub from '~icons/bi/github';

export default function Credits() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <span className="text-muted">
            Made by{' '}
            <a href="https://alrico.es" target="_blank" rel="noreferrer">
              Alberto Rico
            </a>
            . Source code available at{' '}
            <a
              href="https://github.com/alrico88/metarr"
              target="_blank"
              rel="noreferrer"
            >
              <BiGithub /> Github
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
