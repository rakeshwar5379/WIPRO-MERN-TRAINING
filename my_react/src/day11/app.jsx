import React, { useState, Suspense } from "react";

const CourseDetails = React.lazy(() => import("./CourseDetails"));
const InstructorProfile = React.lazy(() => import("./InstructorProfile"));

function App() {
  const [showCourse, setShowCourse] = useState(false);
  const [showTeacher, setShowTeacher] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Online Course</h2>

      <button onClick={() => setShowCourse(true)}>
        View Course Details
      </button>

      <button onClick={() => setShowTeacher(true)} style={{ marginLeft: "10px" }}>
        View Instructor Profile
      </button>

      <Suspense fallback={<p>Loading...</p>}>
        {showCourse && <CourseDetails />}
        {showTeacher && <InstructorProfile />}
      </Suspense>
    </div>
  );
}

export default App;
