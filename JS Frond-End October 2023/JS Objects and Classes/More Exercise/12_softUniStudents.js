function softUniStudents(stringsArray) {
    const courses = {};

    function setCourses(element) {
        [courseTitle, capacity] = element.split(": ")
        if (courses.hasOwnProperty(courseTitle)) {
            courses[courseTitle].capacity += Number(capacity);
        } else {
            courses[courseTitle] = {
                capacity: Number(capacity),
                studentsEnrolled: [],
            };
        };
    };

    function assignStudents(element) {
        let studentData = element.split(" ");
        let courseToEnroll = studentData[5];

        if (courses.hasOwnProperty(courseToEnroll)) {
            if (courses[courseToEnroll].capacity > courses[courseToEnroll].studentsEnrolled.length) {
                let studentInfo = studentData[0];

                firstBracket = studentInfo.indexOf("[");
                let username = studentInfo.slice(0, firstBracket);
                let credits = studentInfo.slice(firstBracket + 1, studentInfo.length - 1);

                let studentEmail = studentData[3];

                courses[courseToEnroll].studentsEnrolled.push({
                    name: username,
                    credits: Number(credits),
                    email: studentEmail,
                });
            };
        };
    };

    function logOutput() {
        let sortedCourses = Object.keys(courses).sort((a, b) =>
            courses[b].studentsEnrolled.length - courses[a].studentsEnrolled.length);

        for (let course of sortedCourses) {
            let placesLeft = courses[course].capacity - courses[course].studentsEnrolled.length;
            let sortedStudens = courses[course].studentsEnrolled.sort((a, b) => b.credits - a.credits);

            console.log(`${course}: ${placesLeft} places left`);

            for (let student of sortedStudens) {
                console.log(`--- ${student.credits}: ${student.name}, ${student.email}`)
            };
        };
    };

    stringsArray.map((element) => {
        if (element.includes(":")) setCourses(element);
        else if (element.includes("email") && (element.includes("joins"))) {
            assignStudents(element);
        };
    });

    logOutput();
}