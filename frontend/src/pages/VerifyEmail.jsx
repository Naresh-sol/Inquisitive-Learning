import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import Loading from './../components/common/Loading';


function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Only allow access of this route when user has filled the signup form
    if (!signupData) {
      navigate("/signup");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const { accountType, firstName, lastName, email, password, confirmPassword, } = signupData;

    dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
      {
        loading ? <Loading />
          :
          (
            <div className="max-w-[500px] p-4 lg:p-8">
              <h1 className="text-richblack-900 font-bold text-[1.875rem] leading-[2.375rem]">Verify Email</h1>

              <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-600">
                A verification code has been sent to you. Enter the code below
              </p>

              <form onSubmit={handleVerifyAndSignup}>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderInput={(props) => (
                    <input
                      {...props}
                      placeholder="-"
                      style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                      className="w-[48px] lg:w-[60px] bg-white border border-gray-300 rounded-[0.5rem] text-richblack-900 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-blue-200 shadow-sm"
                    />
                  )}
                  containerStyle={{
                    justifyContent: "space-between",
                    gap: "0 6px",
                  }}
                />

                <button
                  type="submit"
                  className="w-full bg-[#0056D2] py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-white shadow-md hover:bg-[#004bb5] transition-colors"
                >
                  Verify Email
                </button>
              </form>

              <div className="mt-6 flex items-center justify-between">
                <Link to="/signup">
                  <p className="text-richblack-900 flex items-center gap-x-2 hover:text-[#0056D2] transition-colors">
                    <BiArrowBack /> Back To Signup
                  </p>
                </Link>

                <button
                  className="flex items-center text-[#0056D2] hover:text-[#004bb5] gap-x-2 transition-colors"
                  onClick={() => dispatch(sendOtp(signupData.email, navigate, signupData.firstName), setOtp(''))}
                >
                  <RxCountdownTimer />
                  Resend it
                </button>
              </div>
            </div>
          )}
    </div>
  );
}

export default VerifyEmail;