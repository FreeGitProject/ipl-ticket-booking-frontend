export default function Footer() {
    return (
      <footer className="bg-dark text-white p-3 mt-5">
        <div className="container text-center">
          <p>&copy; {new Date().getFullYear()} EventBooking App. All rights reserved.</p>
        </div>
      </footer>
    );
  }