export default function Steppers(props) {
  return (
    <div className="stepper">
      <div className="steps">
        <div className="eachStepper">
          <div className={`stepNum ${props.step === 1 ? props.active : ""}`}>
            1
          </div>
          <div
            className="stepInfo"
            style={{
              alignSelf: "center",
              width: "150px",
              backgroundColor: "transparent",
              fontSize: "13px",
            }}
          >
            <p style={{ color: "rgba(255,255,255,0.6)" }}>STEP 1</p>
            <span style={{ color: "#fff", fontWeight: "700" }}>YOUR INFO</span>
          </div>
        </div>

        <div className="eachStepper">
          <div className={`stepNum ${props.step === 2 ? props.active : ""}`}>
            2
          </div>
          <div
            className="stepInfo"
            style={{
              alignSelf: "center",
              width: "150px",
              backgroundColor: "transparent",
              fontSize: "13px",
            }}
          >
            <p style={{ color: "rgba(255,255,255,0.6)" }}>STEP 2</p>
            <span style={{ color: "#fff", fontWeight: "700" }}>
              SELECT PLAN
            </span>
          </div>
        </div>

        <div className="eachStepper">
          <div className={`stepNum ${props.step === 3 ? props.active : ""}`}>
            3
          </div>
          <div
            className="stepInfo"
            style={{
              alignSelf: "center",
              width: "150px",
              backgroundColor: "transparent",
              fontSize: "13px",
            }}
          >
            <p style={{ color: "rgba(255,255,255,0.6)" }}>STEP 3</p>
            <span style={{ color: "#fff", fontWeight: "700" }}>ADD-ONS</span>
          </div>
        </div>

        <div className="eachStepper">
          <div className={`stepNum ${props.step === 4 ? props.active : ""}`}>
            4
          </div>
          <div
            className="stepInfo"
            style={{
              alignSelf: "center",
              width: "150px",
              backgroundColor: "transparent",
              fontSize: "13px",
            }}
          >
            <p style={{ color: "rgba(255,255,255,0.6)" }}>STEP 4</p>
            <span style={{ color: "#fff", fontWeight: "700" }}>SUMMARY</span>
          </div>
        </div>
      </div>
    </div>
  );
}
