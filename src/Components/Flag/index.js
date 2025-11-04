import { Link } from "react-router-dom";

export default function Flag() {
  const flag = "RATCTF{This_is_my_blog}";
  const fake_flag = "RATCTF{But_it's_a_fake_flag}";
  return (
    <div
      className="flag-container"
      style={{ textAlign: "center", padding: "2rem" }}
    >
      <h2>Huda, you found the Flag!</h2>
      <p>Nice found, this is your flag:</p>
      <div>
        <p>{fake_flag}</p>
      </div>
      <div hidden>
        <p>{flag}</p>
      </div>
      <div style={{ marginTop: "1.5rem" }}>
        <Link to="/">Back to Main page</Link>
      </div>
    </div>
  );
}
