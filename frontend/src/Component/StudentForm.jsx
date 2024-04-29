import React, { useState } from 'react';
import axios from 'axios';
import "./styles.css"
const StudentForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        standard: '',
        subject: '',
        mark: '',
        comments: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        standard: '',
        subject: '',
        mark: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
            valid = false;
        } else {
            newErrors.name = '';
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
            valid = false;
        } else {
            newErrors.email = '';
        }

        // Standard validation
        if (!formData.standard.trim()) {
            newErrors.standard = 'Standard is required';
            valid = false;
        } else {
            newErrors.standard = '';
        }

        // Subject validation
        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
            valid = false;
        } else {
            newErrors.subject = '';
        }

        // Mark validation
        if (!formData.mark.trim()) {
            newErrors.mark = 'Mark is required';
            valid = false;
        } else if (isNaN(formData.mark) || formData.mark < 0 || formData.mark > 100) {
            newErrors.mark = 'Mark must be a number between 0 and 100';
            valid = false;
        } else {
            newErrors.mark = '';
        }

        setErrors(newErrors);
        return valid;
    };
   

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                // Send form data to the backend
                const response = await axios.post('http://localhost:3000/students', formData);
        window.alert("Form submitted successfully");

                console.log('Form data submitted successfully:', response.data);

                // Reset form after successful submission
                setFormData({
                    name: '',
                    email: '',
                    standard: '',
                    subject: '',
                    mark: '',
                    comments: ''
                });
            } catch (error) {
                console.error('Error submitting form data:', error);
            }
        }
    };

    return (
        <div className='main-section'>
            <h2>Student Form</h2>
            <form onSubmit={handleSubmit} className='form-div'>
                <div>
                    <label>Name</label><br />
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    <span className="error">{errors.name}</span>
                </div>
                <div>
                    <label>Email</label><br />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    <span className="error">{errors.email}</span>
                </div>
                <div>
                    <label>Standard</label><br />
                    <input type="text" name="standard" value={formData.standard} onChange={handleChange} />
                    <span className="error">{errors.standard}</span>
                </div>
                <div>
                    <label>Subject</label><br />
                    <input type="text" name="subject" value={formData.subject} onChange={handleChange} />
                    <span className="error">{errors.subject}</span>
                </div>
                <div>
                    <label>Mark</label><br />
                    <input type="text" name="mark" value={formData.mark} onChange={handleChange} />
                    <span className="error">{errors.mark}</span>
                </div>
                <div>
                    <label>Comments</label><br />
                    <textarea name="comments" value={formData.comments} onChange={handleChange} rows="4" cols="50" />
                </div>
                <div >
                    <button type="submit" className='button-submit'>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default StudentForm;
