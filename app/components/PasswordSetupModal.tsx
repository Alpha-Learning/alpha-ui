"use client";
import React, { useState } from 'react';
import Modal from './Modal';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField, Input } from './forms/FormField';

const passwordSchema = z.object({
  password: z.string()
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type PasswordFormData = z.infer<typeof passwordSchema>;

interface PasswordSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: any;
  userEmail: string;
}

const PasswordSetupModal = ({ isOpen, onClose, onSubmit, userEmail }: PasswordSetupModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema)
  });

  // const handleFormSubmit = async (data: PasswordFormData) => {
  //   setIsSubmitting(true);
  //   try {
  //     // Call the API to set the password
  //     const response = await fetch('/api/auth/set-password', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         email: userEmail,
  //         password: data.password,
  //       }),
  //     });

  //     const result = await response.json();

  //     if (result.success) {
  //       await onSubmit(data.password);
  //       toast.success("Password set successfully!");
  //       reset();
  //       onClose();
  //     } else {
  //       throw new Error(result.message || 'Failed to set password');
  //     }
  //   } catch (error) {
  //     toast.error("Failed to set password. Please try again.");
  //     console.error('Password setup error:', error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleFormSubmit = async (data: PasswordFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data.password);
    } catch (error) {
      console.error('Password submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Set Your Password">
      <div className="p-6">
        <div className="mb-6">
          {/* <h2 className="text-xl font-semibold text-gray-900 mb-2">Welcome! Set Your Password</h2>
          <p className="text-gray-600">
            Your application has been submitted successfully. Please set a password for your account to access your dashboard.
          </p> */}
          <p className="text-sm text-gray-500 mt-2">
            Account: <span className="font-medium">{userEmail}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <FormField label="Password" htmlFor="password" error={errors.password}>
            <Input
              {...register("password")}
              type="password"
              id="password"
              placeholder="Enter your password"
              error={!!errors.password}
            />
          </FormField>

          <FormField label="Confirm Password" htmlFor="confirmPassword" error={errors.confirmPassword}>
            <Input
              {...register("confirmPassword")}
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              error={!!errors.confirmPassword}
            />
          </FormField>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <h4 className="text-sm font-medium text-blue-900 mb-1">Password Requirements:</h4>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• At least 8 characters long</li>
            </ul>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 cursor-pointer text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Skip for Now
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 cursor-pointer bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              {isSubmitting ? "Setting Password..." : "Set Password"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default PasswordSetupModal;
