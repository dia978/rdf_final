import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserRegistrationForm from "@/components/UserRegistrationForm"; // Adjust the path as per your project structure

describe("UserRegistrationForm component", () => {
  it("renders properly", () => {
    render(<UserRegistrationForm />);
    const nameInput = screen.getByLabelText("Name:") as HTMLInputElement;
    const emailInput = screen.getByLabelText("Email:") as HTMLInputElement;
    const dobInput = screen.getByLabelText("Date of Birth:") as HTMLInputElement;
    const contactInput = screen.getByLabelText("Contact Details:") as HTMLInputElement;
    const eduInput = screen.getByLabelText("Educational Background:") as HTMLInputElement;
    const submitButton = screen.getByRole("button", { name: "Submit" });

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(dobInput).toBeInTheDocument();
    expect(contactInput).toBeInTheDocument();
    expect(eduInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("submits form data", () => {
    // Mock console.log
    const consoleSpy = jest.spyOn(console, 'log');
  
    render(<UserRegistrationForm />);
  
    const nameInput = screen.getByLabelText("Name:") as HTMLInputElement;
    const emailInput = screen.getByLabelText("Email:") as HTMLInputElement;
    const dobInput = screen.getByLabelText("Date of Birth:") as HTMLInputElement;
    const contactInput = screen.getByLabelText("Contact Details:") as HTMLInputElement;
    const eduInput = screen.getByLabelText("Educational Background:") as HTMLInputElement;
    const submitButton = screen.getByRole("button", { name: "Submit" });
  
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(dobInput, { target: { value: "1990-01-01" } });
    fireEvent.change(contactInput, { target: { value: "1234567890" } });
    fireEvent.change(eduInput, { target: { value: "Bachelor's in Engineering" } });
  
    fireEvent.click(submitButton);
  
    // Check if console.log is called with the expected arguments
    expect(consoleSpy).toHaveBeenCalledWith('Form submitted with data:', {
      name: "John Doe",
      email: "john@example.com",
      dob: "1990-01-01",
      contactDetails: "1234567890",
      educationalBackground: "Bachelor's in Engineering",
    });
  
    // Restore console.log to its original implementation
    consoleSpy.mockRestore();
  });
  
  

  it("calculates age correctly", () => {
    render(<UserRegistrationForm />);
    const dobInput = screen.getByLabelText("Date of Birth:") as HTMLInputElement;
    fireEvent.change(dobInput, { target: { value: "1990-01-01" } });
    const ageText = screen.getByText("Age: 34 years");

    expect(ageText).toBeInTheDocument();
  });
});
