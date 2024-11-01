import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SkillSelect from "./SkillSelect";
import { profileUpdate } from "../api/user";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/userSlice";
import Toast from "./Toast";
import { useNavigate } from "react-router-dom";
import PhoneView from "./PhoneView";
import axios from "axios";
import { uploadPhoto } from "../api/cloudinary";

const ProfileEdit = ({ setIsEditing }) => {
  const user = useSelector((store) => store.user.user);
  const [toast, setToast] = useState(false);
  const [formValues, setFormValues] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    age: user?.age || "",
    about: user?.about || "",
    gender: user?.gender || "",
    photoUrl: user?.photoUrl || "",
    skills: user?.skills || [],
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET;
  const CLOUDINARY_BASE_URL = import.meta.env.VITE_CLOUDINARY_BASE_URL;

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(3, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(3, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
    age: Yup.number()
      .min(12, "Must be at least 12")
      .max(100, "Too High!")
      .required("Required"),
    about: Yup.string().min(10, "Too Short!").max(50, "Too Long!"),
    gender: Yup.string()
      .oneOf(["male", "female", "other"], "Invalid Gender")
      .required("Required"),
    photoUrl: Yup.string().url("Invalid URL"),
    skills: Yup.array()
      .min(3, "Select at least 3 skills")
      .max(20, "No more than 20 skills"),
  });

  const handleImageUpload = async (file, setFieldValue) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    try {
      uploadPhoto(formData).then((response) => {
        const imageUrl = response.data.secure_url; // Get the secure URL
        setFieldValue("photoUrl", imageUrl); // Set the URL in Formik's values
      });
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const data = await profileUpdate(values, user);
      dispatch(setUser(data?.data?.user));
      setToast(true);
      setTimeout(() => setToast(false), 3000);
      navigate("/feed");
    } catch (error) {
      console.error("Error updating profile", error);
    }
    setSubmitting(false);
  };

  return (
    <>
      {toast && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 w-full flex justify-center pointer-events-none z-20">
          <Toast
            className="w-full max-w-md px-4 py-2 bg-green-500 text-white rounded-md shadow-lg"
            message="Profile updated successfully"
          />
        </div>
      )}
      <div className="flex justify-center my-14">
        <div className="card bg-base-300 w-[30rem] shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile ✏️</h2>
            <Formik
              initialValues={formValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ values, isSubmitting, setFieldValue }) => {
                // Update formValues when Formik values change
                useEffect(() => {
                  setFormValues(values);
                }, [values]);

                const stableSetFieldValue = useCallback(setFieldValue, []);

                const MemoizedSkillSelect = useMemo(
                  () => (
                    <SkillSelect
                      field={{ name: "skills", value: values.skills }}
                      form={{ setFieldValue: stableSetFieldValue }}
                      prefilledSkills={user?.skills || []}
                    />
                  ),
                  [values.skills, stableSetFieldValue]
                );

                return (
                  <Form>
                    <div className="p-4 my-2 space-y-6">
                      <div>
                        <label className="block font-semibold mb-1">
                          First Name:
                        </label>
                        <div className="input input-bordered input-info flex items-center gap-2 p-2">
                          <Field
                            name="firstName"
                            placeholder="First Name"
                            className="grow"
                            onChange={(e) =>
                              setFieldValue("firstName", e.target.value)
                            }
                          />
                          <ErrorMessage
                            name="firstName"
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">
                          Last Name:
                        </label>
                        <div className="input input-bordered input-info flex items-center gap-2 p-2">
                          <Field
                            name="lastName"
                            placeholder="Last Name"
                            className="grow"
                            onChange={(e) =>
                              setFieldValue("lastName", e.target.value)
                            }
                          />
                          <ErrorMessage
                            name="lastName"
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">
                          Email:
                        </label>
                        <div className="input input-bordered input-info flex items-center gap-2 p-2">
                          <Field
                            name="email"
                            type="email"
                            placeholder="Email"
                            className="grow"
                            disabled
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">Age:</label>
                        <div className="input input-bordered input-info flex items-center gap-2 p-2">
                          <Field
                            name="age"
                            type="number"
                            placeholder="Age"
                            className="grow"
                            onChange={(e) =>
                              setFieldValue("age", e.target.value)
                            }
                          />
                          <ErrorMessage
                            name="age"
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">
                          About:
                        </label>
                        <div className="textarea textarea-info flex items-center gap-2 p-2">
                          <Field
                            name="about"
                            as="textarea"
                            placeholder="About"
                            className="grow bg-inherit"
                            onChange={(e) =>
                              setFieldValue("about", e.target.value)
                            }
                          />
                          <ErrorMessage
                            name="about"
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">
                          Gender:
                        </label>
                        <div className="input input-bordered input-info flex items-center gap-2 p-2">
                          <Field
                            as="select"
                            name="gender"
                            className="grow bg-inherit"
                            onChange={(e) =>
                              setFieldValue("gender", e.target.value)
                            }
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </Field>
                          <ErrorMessage
                            name="gender"
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">
                          Profile Photo:
                        </label>
                        <div className="">
                          <input
                            name="photoUrl"
                            type="file"
                            placeholder="Profile Photo"
                            className="grow file-input file-input-bordered file-input-primary w-full max-w-xl"
                            accept="image/*"
                            onChange={(event) => {
                              const file = event.target.files[0];
                              if (file) handleImageUpload(file, setFieldValue);
                            }}
                          />
                          <ErrorMessage
                            name="photoUrl"
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">
                          Skills:
                        </label>
                        <div className="textarea textarea-info flex items-center gap-2 p-2">
                          {MemoizedSkillSelect}
                          <ErrorMessage
                            name="skills"
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="card-actions justify-center">
                      <button
                        type="button"
                        className="btn bg-red-500 text-black hover:bg-red-600 font-semibold"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="loading loading-dots loading-lg text-blue-200"></span>
                        ) : (
                          "Save Changes"
                        )}
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
        <div className="w-[20rem] px-4 sticky top-20 hidden lg:block">
          {formValues && (
            <PhoneView user={formValues} isButtonsRequired={false} />
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;
