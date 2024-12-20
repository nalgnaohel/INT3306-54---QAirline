import React, { useRef, useState } from "react";
import "./Signup.css";
import moment from "moment";
import Footer from "../../../components/Footer/Footer";
import TopNavBar from "../../../components/Navbar/TopNavBar";
import { useNavigate } from "react-router-dom";

//Signup Page
const Signup: React.FC = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  //Status for each field in the form
  const [haveEmail, setEmail] = useState("valid");
  const [havePassword, setPassword] = useState(true);
  const [title, setTitle] = useState("");
  const [haveLastName, setLastName] = useState(true);
  const [haveDob, setDob] = useState("valid");
  const [gender, setGender] = useState("");
  const [haveFirstName, setFirstName] = useState(true);
  const [havePhone, setPhone] = useState(true);
  const [repass, setRepass] = useState("");
  const [pswMatch, setPswMatch] = useState(true);
  const [haveNationality, setNationality] = useState(true);
  const [haveIdentityNo, setIdentityNo] = useState(true);

  const lastNameInputRef = useRef<HTMLInputElement | null>(null);
  const firstNameInputRef = useRef<HTMLInputElement | null>(null);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const repassInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const dobInputRef = useRef<HTMLInputElement | null>(null);
  const nationalityInputRef = useRef<HTMLInputElement | null>(null);
  const identityNoInputRef = useRef<HTMLInputElement | null>(null);
  const dobRef = useRef<HTMLParagraphElement | null>(null);
  const emailRef = useRef<HTMLParagraphElement | null>(null);

  const [formData, setFormData] = useState({
    title: "mr",
    firstName: "",
    lastName: "",
    dob: "08/01/2004",
    gender: "male",
    email: "",
    password: "",
    phone: "0981234567",
    nationality: "Việt Nam",
    identityNo: "012123456789",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "repass") {
      setRepass(e.target.value);
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "dob") {
      console.log(formData.dob);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //console.log(formData.identityNo);
    lastNameInputRef.current?.blur();
    firstNameInputRef.current?.blur();
    phoneInputRef.current?.blur();
    passwordInputRef.current?.blur();
    repassInputRef.current?.blur();
    emailInputRef.current?.blur();
    dobInputRef.current?.blur();
    nationalityInputRef.current?.blur();
    identityNoInputRef.current?.blur();
    emailRef.current?.blur();
    dobRef.current?.blur();

    if (formData.lastName === "") {
      console.log("flastname");
      setLastName(false);
      lastNameInputRef.current?.focus();
      return;
    } else {
      if (lastNameInputRef.current) {
        lastNameInputRef.current.blur();
      }
      setLastName(true);
    }

    if (formData.firstName === "") {
      console.log("ffname");
      setFirstName(false);
      firstNameInputRef.current?.focus();
      return;
    } else setFirstName(true);

    if (formData.dob === "") {
      console.log("dob");
      setDob("blank");
      dobInputRef.current?.focus();
      if (dobRef.current) {
        dobRef.current.textContent = "Vui lòng không bỏ trống";
      }
      return;
    } else if (!ValidateDOB(formData.dob)) {
      console.log(formData.dob);
      setDob("invalid");
      dobInputRef.current?.focus();
      if (dobRef.current) {
        dobRef.current.textContent = "Ngày tháng năm sinh không hợp lệ";
      }
      return;
    } else {
      setDob("valid");
      if (dobRef.current) {
        dobRef.current.textContent = "";
      }
      //formData.dob = moment(formData.dob, "DD/MM/YYYY").format("YYYY-MM-DD") + "00:00:00.000000";
    }

    if (formData.email === "") {
      console.log("email");
      setEmail("blank");
      if (emailRef.current) {
        emailRef.current.textContent = "Vui lòng không bỏ trống";
      }
      return;
    } else if (!validateEmail(formData.email)) {
      console.log("email-");
      setEmail("invalid");
      if (emailRef.current) {
        emailRef.current.textContent = "Email không hợp lệ";
      }
      return;
    } else {
      setEmail("valid");
      if (emailRef.current) {
        emailRef.current.textContent = "";
      }
    }

    if (formData.password === "") {
      console.log("password");
      setPassword(false);
      return;
    } else setPassword(true);

    if (formData.phone === "") {
      console.log("phone");
      setPhone(false);
      return;
    } else setPhone(true);

    if (formData.nationality === "") {
      console.log("national");
      setNationality(false);
      return;
    } else setNationality(true);

    if (formData.identityNo === "") {
      console.log("identity");
      setIdentityNo(false);
      return;
    } else setIdentityNo(true);

    if (formData.password !== repass) {
      setPswMatch(false);
      return;
    } else setPswMatch(true);

    //If all fields are valid
    console.log("ok");
    try {
      var fDOB = formData.dob;
      fDOB =
        moment(fDOB, "DD/MM/YYYY").format("YYYY-MM-DD") + "T07:00:00+07:00";
      //formData.dob = moment(formData.dob, "DD/MM/YYYY").format("YYYY-MM-DD") + "00:00:00.000000";
      const postTo = {
        title: formData.title,
        first_name: formData.firstName,
        last_name: formData.lastName,
        dob: fDOB,
        gender: formData.gender,
        email: formData.email,
        password: formData.password,
        phone_number: formData.phone,
        avatar: "https://www.gravatar.com/avatar/",
        nationality: formData.nationality,
        identity_no: formData.identityNo,
      };
      const response = await fetch(`http://127.0.0.1:5000/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postTo),
      });
      const data = await response.json();
      //console.log(data.user);
      alert("Đăng ký thành công");
      navigate("/login");
    } catch (error) {
      alert("Error: " + error);
    }
  };

  return (
    <>
      <TopNavBar />
      <div className="Signup">
        <div className="main-container">
          <div className="signup-form-container">
            <form className="signup-form" action="POST" onSubmit={handleSubmit}>
              <div className="form-flex">
                <div className="form-col">
                  <div className="welcome">
                    <p>Chào mừng đến với QAirline</p>
                    <h2>Đăng ký tài khoản</h2>
                  </div>

                  <h3>Thông tin cá nhân</h3>
                  <div className="flex-here">
                    <div className="component title">
                      <label htmlFor="title">Danh xưng</label>
                      <select
                        defaultValue="mr"
                        name="title"
                        onChange={(e) => {
                          formData.title = e.target.value;
                          setTitle(e.target.value);
                        }}
                      >
                        <option value="mr">Ông</option>
                        <option value="mrs">Bà</option>
                        <option value="miss">Cô/Chị</option>
                      </select>
                      {/* <p className={`${}`}>Vui lòng chọn danh xưng</p> */}
                    </div>
                    <div className="component last-name">
                      <label htmlFor="lastName">Họ</label>
                      <input
                        ref={lastNameInputRef}
                        type="text"
                        name="lastName"
                        placeholder="Ho"
                        onChange={handleChange}
                      />
                      <p className={`${haveLastName ? "hide" : "show"}`}>
                        Vui lòng không bỏ trống
                      </p>
                    </div>
                  </div>
                  <div className="component dob">
                    <label htmlFor="dob">Ngày, Tháng, Năm sinh</label>
                    <input
                      type="text"
                      name="dob"
                      placeholder="dd/mm/yyyy"
                      onChange={handleChange}
                    />
                    <p
                      ref={dobRef}
                      className={`${haveDob == "valid" ? "hide" : "show"}`}
                    >
                      F
                    </p>
                  </div>

                  <h3>Thông tin liên hệ</h3>
                  <div className="component email">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={handleChange}
                    />
                    <p
                      ref={emailRef}
                      className={`${haveEmail == "valid" ? "hide" : "show"}`}
                    >
                      F
                    </p>
                  </div>
                  <div className="component nationality">
                    <label htmlFor="nationality">Quốc tịch</label>
                    <input
                      type="text"
                      name="nationality"
                      placeholder="Quốc tich"
                      onChange={handleChange}
                    />
                    <p className={`${haveNationality ? "hide" : "show"}`}>
                      Vui long khong de trong
                    </p>
                  </div>
                  <div className="component identity_no">
                    <label htmlFor="identityNo">Số CMND</label>
                    <input
                      type="text"
                      name="identityNo"
                      placeholder="So CMND"
                      onChange={handleChange}
                    />
                    <p className={`${haveIdentityNo ? "hide" : "show"}`}>
                      Vui long khong de trong
                    </p>
                  </div>

                  <h3>Thông tin tài khoản</h3>
                  <div className="component password">
                    <label htmlFor="password">Mật khẩu</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Mật khẩu"
                      onChange={handleChange}
                    />
                    <p className={`${havePassword ? "hide" : "show"}`}>
                      Vui long khong de trong
                    </p>
                  </div>
                </div>
                <div className="form-col right">
                  <div className="top">
                    <h3></h3>
                    <div className="component first-name">
                      <label htmlFor="firstName">Tên</label>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="Ten"
                        onChange={handleChange}
                      />
                      <p className={`${haveFirstName ? "hide" : "show"}`}>
                        Vui long khong de trong
                      </p>
                    </div>
                    <div className="component gender">
                      <label htmlFor="gender">Gioi tinh</label>
                      <select
                        name="gender"
                        id="gender"
                        defaultValue="male"
                        onChange={(e) => {
                          formData.gender = e.target.value;
                          setGender(e.target.value);
                        }}
                      >
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                      </select>
                    </div>
                  </div>
                  <div className="component phone">
                    <label htmlFor="phone">Số điện thoại</label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="So dien thoai"
                      onChange={handleChange}
                    />
                    <p className={`${havePhone ? "hide" : "show"}`}>
                      Vui long khong de trong
                    </p>
                  </div>
                  <div className="component repass">
                    <label htmlFor="repass">Xác nhận mật khẩu</label>
                    <input
                      type="password"
                      name="repass"
                      placeholder="Xác nhận mật khẩu"
                      onChange={handleChange}
                    />
                    <p className={`${pswMatch ? "hide" : "show"}`}>
                      Mật khẩu không khớp
                    </p>
                  </div>
                </div>
              </div>
              <div className="check-boxes">
                <div className="check-box">
                  <input type="checkbox" name="agree" required />
                  <label htmlFor="agree">
                    Tôi đồng ý với các điều khoản và điều kiện của QAirline
                  </label>
                </div>
                <div className="check-box">
                  <input type="checkbox" name="qcao" />
                  <label htmlFor="qcao">
                    Tôi đồng ý nhận thông tin quảng cáo từ QAirline
                  </label>
                </div>
              </div>
              <button type="submit">Dang ky</button>
            </form>
            <div className="toLogin">
              <p>Đã có tài khoản? </p>
              <a href="/login">Đăng nhập</a>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
};

//Validate dob format
function validateDOBFormat(dob: string) {
  const dateFormat = "DD/MM/YYYY";
  return moment(dob, dateFormat, true).isValid();
}

//Validate dob
function ValidateDOB(dob: string) {
  if (!validateDOBFormat(dob)) {
    return false;
  }
  const dobArr = dob.split("/"); //dd, mm, yyyy
  const day = parseInt(dobArr[0]);
  const month = parseInt(dobArr[1]);
  const year = parseInt(dobArr[2]);

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    console.log("nan");
    return false;
  }

  if (month < 1 || month > 12) {
    console.log("month");
    return false;
  }

  if (
    month === 1 ||
    month === 3 ||
    month === 5 ||
    month === 7 ||
    month === 8 ||
    month === 10 ||
    month === 12
  ) {
    if (day < 1 || day > 31) {
      console.log("day1");
      return false;
    }
  } else if (month === 2) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      if (day < 1 || day > 29) {
        console.log("day2");
        return false;
      }
    } else {
      if (day < 1 || day > 28) {
        console.log("day3");
        return false;
      } //return false;
    }
  } else {
    if (day < 1 || day > 30) {
      console.log("day4");
      return false;
    }
  }

  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 150;
  const currentMonth = new Date().getMonth() + 1;

  if (
    year < minYear ||
    year > currentYear ||
    (month > currentMonth && year === currentYear)
  ) {
    console.log("year");
    return false;
  }

  return true;
}

//Validate email
function validateEmail(email: string) {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regex.test(email)) {
    return false;
  }
  return true;
}

export default Signup;
