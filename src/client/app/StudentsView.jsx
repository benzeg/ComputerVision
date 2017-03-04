import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import {getAllStudents} from './helpers/viewHelpers.js';
import StudentsList from './StudentsList.jsx';
import StudentTestList from './StudentTestList.jsx';
import css from '../css/nav.css';

class StudentsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      students: this.props.students,
      currentStudentName: null,
      currentId: null,
      currentCourse: null,
      currentCourseId: null
    };

    this.handleStudentsListEntryClick = this.handleStudentsListEntryClick.bind(this);
  }

  componentWillMount() {
  }

  handleStudentsListEntryClick(studentName, studentId, studentCourse, studentCourseId) {
    console.log('STUDENT NAME', studentName);
    console.log('STUDENT ID', studentId);
    console.log('STUDENT COURSE', studentCourse);
    console.log('CURRENT COURSE', studentCourseId);

    this.setState({
      currentStudentName: studentName,
      currentId: studentId,
      currentCourse: studentCourse,
      currentCourseId: studentCourseId
    });
  }

  render() {
    if (this.state.currentStudentName === null) {
      return (
        <div>
          <h3>Students</h3>
          <StudentsList students={this.state.students}
                        currentStudentId={this.state.currentStudent}
                        handleStudentsListEntryClick={this.handleStudentsListEntryClick} 
          />
        </div>
      );  
    } else {
      return (
        <div>
          <h3>{this.state.currentStudentName + "'s Tests"}</h3>
          <StudentTestList
            studentName={this.state.currentStudentName}
            studentId={this.state.currentId}
            currentCourse={this.state.currentCourse}
            currentCourseId={this.state.currentCourseId}
            />
        </div>
      );
    }
  }
}

export default StudentsView;
