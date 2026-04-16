import Reveal from "./Reveal";

export default function Philosophy() {
  return (
    <div className="philosophy-outer">
      <Reveal className="philosophy-inner">
        <blockquote>
          {"\u201C"}The best car in the world is the one that makes you want to go for a drive for
          no reason.{"\u201D"}
        </blockquote>
        <cite>The Apex Vault Ethos</cite>
      </Reveal>
    </div>
  );
}
