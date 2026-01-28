import React from 'react';

const Contact = () => {
    return(
    <div className="max-w-4xl mx-auto py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="p-6 border rounded-lg shadow-sm">
            <h3 className="font-bold text-emerald-700">Phone Number</h3>
            <p>87780 45943</p>
        </div>
        <div className="p-6 border rounded-lg shadow-sm">
            <h3 className="font-bold text-emerald-700">Address</h3>
            <p>235, Palacode,Dharmapuri,Tamil Nadu - 636 808</p>
        </div>
        </div>
    </div>
    );
};

export default Contact;