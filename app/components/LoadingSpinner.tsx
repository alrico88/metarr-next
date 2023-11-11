export default function LoadingSpinner(props: { text?: string }) {
  return (
    <div className="hstack gap-3 align-items-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div>{props.text}</div>
    </div>
  );
}
