


const Footer = () => {
  return (
 
    <footer className="bg-black min-h-[40vh] py-10 px-4 border-t border-black">
      
  
      <div 
    
        className="container mx-auto flex flex-col justify-center items-center sm:grid sm:grid-cols-3 sm:gap-8 sm:h-full sm:items-start pt-10"
      >
        
       
        <div className="footer-card landing-Card">
          <p className="text-2xl font-bold text-blue-600 mb-3">Create Tickets</p>
          <p className="text-gray-700">Submit new tickets instantly for validation and auto-tracking. Start resolving faster.</p>
        </div>
        
    
        <div className="footer-card landing-Card">
          <p className="text-2xl font-bold text-blue-600 mb-3">View & Manage</p>
          <p className="text-gray-700">See your entire workload at a glance. Assign, prioritize, and update any ticket.</p>
        </div>
        
       
        <div className="footer-card landing-Card">
          <p className="text-2xl font-bold text-blue-600 mb-3">Secure</p>
          <p className="text-gray-700">Your data is secured with enterprise standards. Thank you for choosing our platform!</p>
        </div>
        
      </div>

    
      <div className="text-center  font-bold text-white text-sm mt-12 italics ">
        <p>All rights reserved | Privacy Policy | Terms | Support</p>
      </div>
    </footer>
  );
};

export default Footer;