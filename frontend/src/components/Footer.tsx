import { Link } from 'react-router-dom';
import { Github, Mail, Linkedin, ArrowUpRight, Youtube } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from './ui/alert-dialog';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [showEmailDialog, setShowEmailDialog] = useState(false);

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowEmailDialog(true);
  };

  const openGmail = () => {
    window.open('https://mail.google.com/mail/?view=cm&to=bluejin1130@gmail.com', '_blank');
    setShowEmailDialog(false);
  };

  const openNaver = () => {
    window.open('https://mail.naver.com/write/popup?srvid=note&to=bluejin1130@gmail.com', '_blank');
    setShowEmailDialog(false);
  };

  const links = [
    { to: '/about', label: '소개' },
    { to: '/projects', label: '프로젝트' },
    { to: '/services', label: '서비스' },
    { to: '/courses', label: '강의' },
  ];

  const socials = [
    { icon: Github, href: 'https://github.com/heishia', label: 'GitHub' },
    { icon: Youtube, href: 'https://www.youtube.com/@%EA%B9%80%EB%BD%91%ED%9D%ACAI', label: 'YouTube' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:bluejin1130@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-12">
        {/* Main Footer */}
        <div className="py-4 md:py-12 lg:py-20">
          {/* Mobile Layout */}
          <div className="md:hidden space-y-4">
            {/* Brand and Socials in one row */}
            <div className="flex items-center justify-between">
              <Link to="/" className="group">
                <span className="text-base font-bold">DEV_PPOP</span>
              </Link>
              <div className="flex items-center gap-2">
                {socials.map((social) => {
                  const Icon = social.icon;
                  const isEmail = social.label === 'Email';
                  
                  if (isEmail) {
                    return (
                      <motion.button
                        key={social.label}
                        onClick={handleEmailClick}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-7 h-7 bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-all"
                        aria-label={social.label}
                      >
                        <Icon size={14} />
                      </motion.button>
                    );
                  }
                  
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-7 h-7 bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-all"
                      aria-label={social.label}
                    >
                      <Icon size={14} />
                    </motion.a>
                  );
                })}
              </div>
            </div>
            
            {/* Contact Info - Compact */}
            <div className="flex flex-col gap-2 text-xs text-gray-400">
              <a
                href="mailto:bluejin1130@gmail.com"
                className="hover:text-white transition-colors"
                onClick={handleEmailClick}
              >
                bluejin1130@gmail.com
              </a>
              <a
                href="tel:+821058034771"
                className="hover:text-white transition-colors"
              >
                010-5803-4771
              </a>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link to="/" className="inline-block group mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold">DEV_PPOP</span>
                </div>
              </Link>
              <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-md">
                무엇이든지 구현해내는 풀스택 개발자.
                <br />
                Do not say no
              </p>
              <div className="flex items-center gap-4">
                {socials.map((social) => {
                  const Icon = social.icon;
                  const isEmail = social.label === 'Email';
                  
                  if (isEmail) {
                    return (
                      <motion.button
                        key={social.label}
                        onClick={handleEmailClick}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-12 h-12 bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-all duration-300"
                        aria-label={social.label}
                      >
                        <Icon size={20} />
                      </motion.button>
                    );
                  }
                  
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-all duration-300"
                      aria-label={social.label}
                    >
                      <Icon size={20} />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">빠른 링크</h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="group inline-flex items-center gap-2 text-base text-gray-400 hover:text-white transition-colors"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-6">연락처</h4>
              <ul className="space-y-4 text-base text-gray-400">
                <li>
                  <a
                    href="mailto:bluejin1130@gmail.com"
                    className="hover:text-white transition-colors"
                    onClick={handleEmailClick}
                  >
                    bluejin1130@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+821058034771"
                    className="hover:text-white transition-colors"
                  >
                    010-5803-4771
                  </a>
                </li>
                <li className="pt-4">
                  <Link
                    to="/services"
                    className="inline-block px-6 py-3 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all duration-300"
                  >
                    프로젝트 문의
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-2 md:py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-1.5 md:gap-4 text-gray-400">
            <p 
              className="md:text-sm leading-tight"
              style={{ fontSize: '8px' }}
            >
              © {currentYear} Developer Portfolio. All rights reserved.
            </p>
            <div className="flex items-center gap-2 md:gap-6">
              <a 
                href="#" 
                className="md:text-sm hover:text-white transition-colors whitespace-nowrap leading-tight"
                style={{ fontSize: '8px' }}
              >
                개인정보처리방침
              </a>
              <a 
                href="#" 
                className="md:text-sm hover:text-white transition-colors whitespace-nowrap leading-tight"
                style={{ fontSize: '8px' }}
              >
                이용약관
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Email Dialog */}
      <AlertDialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>이메일 보내기</AlertDialogTitle>
            <AlertDialogDescription>
              bluejin1130@gmail.com으로 이메일을 보내시겠습니까?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              onClick={() => setShowEmailDialog(false)}
            >
              취소
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={openGmail}
            >
              Gmail로 보내기
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={openNaver}
            >
              Naver로 보내기
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </footer>
  );
}