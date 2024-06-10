"use client";

import React from "react";
import Image from "next/image";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const validationSchema = Yup.object({
  date: Yup.date()
    .required("Date is required")
    .min(new Date("2000-01-01"), "Date must be later than 1900-01-01")
    .max(new Date(), "Date cannot be in the future")
    .nullable(),
  fullname: Yup.string()
    .min(3, "Full name must be at least 3 characters long")
    .max(40, "Full name cannot be longer than 40 characters")
    .required("Fullname is required")
    .nullable(),
  college: Yup.string().required("College name is required").nullable(),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  subject: Yup.string().required("Subject is required").nullable(),
  reason: Yup.string().required("Reason is required").nullable(),
  sign: Yup.mixed().required("Sigeneture is required"),
});

const FormGenerator = () => {
  const formik = useFormik({
    initialValues: {
      date: "",
      fullname: "",
      college: "",
      email: "",
      subject: "",
      reason: "",
      sign: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {},
  });

  const { values, errors, handleChange, handleSubmit, setFieldValue } = formik;

  const generatePDF = () => {
    const pdfFile = document.getElementById("letterView");

    html2canvas(pdfFile).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 210, 297); // A4 size: 210x297mm
      pdf.save("example.pdf");
    });
  };
  const dateObject = new Date(values.date);

  const formattedDate = dateObject.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <>
      <div className="container mx-auto max-w-[1440px] px-10">
        <div className="flex">
          <div className="left">
            <form className="py-20" onSubmit={handleSubmit}>
              <div className="grid gap-6 mb-6 min-w-[400px] ">
                <div>
                  <label
                    htmlFor="date"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={values.date}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  {errors.date && (
                    <div className="text-red-500 text-xs pt-2">
                      {errors.date}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="college"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    College Name
                  </label>
                  <input
                    type="text"
                    id="college"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Academia International College"
                    value={values.college}
                    onChange={handleChange}
                    required
                  />
                  {errors.college && (
                    <div className="text-red-500 text-xs pt-2">
                      {errors.college}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Sick Leave"
                    value={values.subject}
                    onChange={handleChange}
                    required
                  />
                  {errors.college && (
                    <div className="text-red-500 text-xs pt-2">
                      {errors.college}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="reason"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Reason
                  </label>
                  <input
                    type="text"
                    id="reason"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Fever"
                    value={values.reason}
                    onChange={handleChange}
                    required
                  />
                  {errors.college && (
                    <div className="text-red-500 text-xs pt-2">
                      {errors.college}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="john.doe@company.com"
                    value={values.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && (
                    <div className="text-red-500 text-xs pt-2">
                      {errors.email}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="fullname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Ram Shrestha"
                    value={values.fullname}
                    onChange={handleChange}
                    required
                  />
                  {errors.fullname && (
                    <div className="text-red-500 text-xs pt-2">
                      {errors.fullname}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="dropzone-file"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Upload Sign
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-50 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        name="sign"
                        accept="image/*"
                        onChange={(event) =>
                          setFieldValue("sign", event.currentTarget.files[0])
                        }
                      />
                    </label>
                  </div>

                  {errors.sign && (
                    <div className="text-red-500 text-xs pt-2">
                      {errors.sign}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={generatePDF}
                >
                  Download Letter
                </button>
              </div>
            </form>
          </div>
          <div className="letter py-20 pl-20 flex-1">
            <div id="letterView" className="w-full p-6 leading-7">
              <div className="flex justify-end">
                <time dateTime={values.date}>
                  Date: {formattedDate === "Invalid Date" ? "" : formattedDate}
                </time>
                <br />
                <br />
              </div>
              <div className="head mb-6">
                <br />
                <p>To</p>
                <p>The principal,</p>
                <p>{values.college}</p>
                <br />
                <p>
                  <strong>Subject: {values.subject}</strong>
                </p>
                <br />
                <p>
                  <strong>Dear Sir/Madam,</strong>
                </p>
                <p>
                  I am writing to request a leave of absence today due to
                  <strong>{" " + values.reason}</strong>.Thank you for
                  considering my request. Please let me know if you need any
                  additional information at <strong>{values.email}</strong>.
                </p>
                <br />
                <br />
                <p>
                  <strong>Sincerely,</strong>
                </p>
                <p>{values.fullname}</p>
                <div className="max-w-[200px] mb-32">
                  {values.sign && (
                    <Image
                      src={URL.createObjectURL(values.sign)}
                      width={200}
                      height={200}
                      alt={values.sign}
                      layout="responsive"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormGenerator;
