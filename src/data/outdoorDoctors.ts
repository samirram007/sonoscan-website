// ──────────────────────────────────────────────
// OPD (Outdoor Doctor) roster — sourced from
// https://www.sonoscanhealthcare.net/sono/opd-doctor.php
// Scraped and normalized for the Sonoscan website.
// Departments are grouped per branch; each doctor carries
// qualifications and per-day consultation time windows.
// ──────────────────────────────────────────────
import type { OpdDepartmentGroup, OpdAppointmentDoctor } from '../features/doctors/schema'

function initialsOf(name: string): string {
  const clean = name.replace(/^Dr\.?\s*/i, '')
  const tokens = clean.includes('.')
    ? clean.split(/[.\s]+/).filter(Boolean)
    : clean.split(/\s+/).filter(Boolean)
  if (tokens.length === 0) return 'DR'
  return tokens
    .map(t => t.charAt(0).toUpperCase())
    .slice(0, 3)
    .join('')
}

export const outdoorDoctorGroups: Record<string, OpdDepartmentGroup[]> = {
  kolkata: [
    { id: 'cardiology', name: 'Cardiology', doctors: [
      { name: "Dr. Ashfaque Ahmed", qualification: "MD,DM", schedule: [{ day: 'Mon', time: "09:00 - 11:00" }, { day: 'Wed', time: "09:00 - 11:00" }, { day: 'Fri', time: "09:00 - 11:00" }] },
      { name: "Dr. B.P.Chatterjee", qualification: "MD,DM", schedule: [{ day: 'Mon', time: "09:00 - 10:00" }, { day: 'Tue', time: "09:00 - 10:00" }, { day: 'Wed', time: "09:00 - 10:00" }, { day: 'Thu', time: "09:00 - 10:00" }, { day: 'Fri', time: "09:00 - 10:00" }, { day: 'Sat', time: "09:00 - 10:00" }] },
      { name: "Dr. Biswarup Sarkar", qualification: "MD,DM", schedule: [{ day: 'Tue', time: "10:00 - 12:00" }, { day: 'Sat', time: "10:00 - 12:00" }] },
      { name: "Dr. Debabrata Sarkar", qualification: "MD,DM", schedule: [{ day: 'Sun', time: "12:00 - 14:00" }] },
      { name: "Dr. Dharmendra Kumar Singh", qualification: "DNB,DM", schedule: [{ day: 'Mon', time: "09:00 - 11:00" }, { day: 'Sat', time: "17:00 - 19:00" }] },
      { name: "Dr. Kapildev Mondal", qualification: "MD,DM OPD", schedule: [{ day: 'Thu', time: "10:00 - 12:00" }] },
      { name: "Dr. Lina Mukhopadhyay", qualification: "MD,DM", schedule: [{ day: 'Wed', time: "14:00 - 15:00" }] },
      { name: "Dr. Malay Acharyya", qualification: "MD.,DM.", schedule: [{ day: 'Thu', time: "14:00 - 16:00" }, { day: 'Fri', time: "11:00 - 13:00" }] },
      { name: "Dr. Santanu De", qualification: "MD,DM.", schedule: [{ day: 'Mon', time: "17:00 - 19:00" }, { day: 'Tue', time: "10:00 - 12:00" }, { day: 'Fri', time: "18:00 - 20:00" }] },
      { name: "Dr. Saujatya Chakraborty", qualification: "MD,DM", schedule: [{ day: 'Wed', time: "16:00 - 18:00" }] },
      { name: "Dr. Soumyojit Saha", qualification: "MD.,DM.", schedule: [{ day: 'Mon', time: "17:00 - 19:00" }, { day: 'Sat', time: "17:00 - 19:00" }] },
      { name: "Dr. Subhra Aditya", qualification: "MD, DM", schedule: [{ day: 'Tue', time: "12:00 - 13:00" }, { day: 'Fri', time: "12:00 - 13:00" }] },
    ] },
    { id: 'cardiothoracic-surgeon', name: 'Cardiothoracic Surgeon', doctors: [
      { name: "Dr. Amanul Hoque", qualification: "MS,MCH(CVTS)", schedule: [{ day: 'Tue', time: "08:00 - 10:00" }, { day: 'Thu', time: "08:00 - 10:00" }, { day: 'Sat', time: "08:00 - 10:00" }] },
    ] },
    { id: 'chest-medicine', name: 'Chest Medicine', doctors: [
      { name: "Dr. Aniket Debnath", qualification: "MBBS,MD", schedule: [{ day: 'Mon', time: "14:00 - 16:00" }, { day: 'Thu', time: "14:00 - 16:00" }] },
      { name: "Dr. Priyanka Ghosh", qualification: "MD,DNB", schedule: [{ day: 'Wed', time: "13:00 - 15:00" }, { day: 'Sat', time: "15:00 - 17:00" }] },
      { name: "Dr. Sumanta Jha", qualification: "MD,DM", schedule: [{ day: 'Thu', time: "18:00 - 20:00" }] },
    ] },
    { id: 'dermatology', name: 'Dermatology', doctors: [
      { name: "Dr. Ayush Bindal", qualification: "MBBS,MD", schedule: [{ day: 'Mon', time: "19:00 - 21:00" }, { day: 'Tue', time: "19:00 - 21:00" }, { day: 'Wed', time: "19:00 - 21:00" }] },
      { name: "Dr. Farhat Fatima", qualification: "MBBS,MD", schedule: [{ day: 'Tue', time: "18:00 - 20:00" }, { day: 'Thu', time: "17:00 - 19:00" }, { day: 'Sat', time: "11:00 - 13:00" }] },
      { name: "Dr. Kaushiki Hajra", qualification: "MBBS,MD", schedule: [{ day: 'Wed', time: "11:00 - 13:00" }, { day: 'Sat', time: "15:00 - 17:00" }] },
      { name: "Dr. Pranjal Praveen", qualification: "MD", schedule: [{ day: 'Tue', time: "14:30 - 16:30" }, { day: 'Wed', time: "14:30 - 16:30" }, { day: 'Fri', time: "14:30 - 16:30" }] },
      { name: "Dr. Somodyuti Chandra", qualification: "MBBS,MD,DNB", schedule: [{ day: 'Mon', time: "13:00 - 14:30" }, { day: 'Sat', time: "18:00 - 20:00" }] },
      { name: "Dr. Sonal Bansal", qualification: "MBBS,MD,DNB", schedule: [{ day: 'Mon', time: "15:00 - 17:00" }, { day: 'Fri', time: "13:00 - 15:00" }, { day: 'Sun', time: "23:00 - 13:00" }] },
      { name: "Dr. Sumit Sen", qualification: "MD", schedule: [{ day: 'Thu', time: "16:00 - 18:00" }] },
      { name: "Dr. Swagata Das", qualification: "MBBS,MD", schedule: [{ day: 'Tue', time: "11:00 - 13:00" }, { day: 'Wed', time: "19:00 - 21:00" }, { day: 'Thu', time: "11:00 - 13:00" }, { day: 'Fri', time: "19:00 - 21:00" }] },
    ] },
    { id: 'endocrinology', name: 'Endocrinology', doctors: [
      { name: "Dr. D.Biswas", qualification: "MD,DM OPD", schedule: [{ day: 'Tue', time: "14:00 - 16:00" }] },
      { name: "Dr. Ranen Dasgupta", qualification: "MD,DM", schedule: [{ day: 'Mon', time: "13:00 - 15:00" }, { day: 'Fri', time: "13:00 - 15:00" }] },
      { name: "Dr. Salil Kr Pal", qualification: "MD.DM", schedule: [{ day: 'Wed', time: "09:00 - 10:00" }] },
      { name: "Dr. Shoeb Kaiser", qualification: "MBBS, DCH, MD,DM", schedule: [{ day: 'Sat', time: "11:00 - 13:00" }] },
      { name: "Dr. Soumita Mandal", qualification: "MD,DM", schedule: [{ day: 'Thu', time: "16:00 - 18:00" }, { day: 'Sun', time: "14:00 - 16:00" }] },
    ] },
    { id: 'ent-surgeon', name: 'ENT Surgeon', doctors: [
      { name: "Dr. Diptanshu Mukherjee", qualification: "MBBS,MS", schedule: [{ day: 'Tue', time: "14:00 - 16:00" }, { day: 'Wed', time: "19:00 - 21:00" }, { day: 'Fri', time: "14:00 - 16:00" }] },
      { name: "Dr. Huma Nasrin Haque", qualification: "MBBS,MS(ENT)", schedule: [{ day: 'Mon', time: "11:00 - 13:00" }, { day: 'Wed', time: "11:00 - 13:00" }] },
      { name: "Dr. Prof.B.K.Roychaudhuri", qualification: "MBBS, DLO, MS, FSMF", schedule: [{ day: 'Tue', time: "11:00 - 14:00" }, { day: 'Sat', time: "11:00 - 14:00" }] },
      { name: "Dr. Souvik Roy Choudhury", qualification: "MBBS,MS", schedule: [{ day: 'Tue', time: "18:00 - 20:00" }, { day: 'Thu', time: "18:00 - 20:00" }, { day: 'Fri', time: "18:00 - 20:00" }] },
    ] },
    { id: 'gastroenterology', name: 'Gastroenterology', doctors: [
      { name: "Dr. Awanish Tewari", qualification: "MD,DM", schedule: [{ day: 'Fri', time: "19:00 - 21:00" }] },
      { name: "Dr. Bipul Barman", qualification: "MD,DM", schedule: [{ day: 'Mon', time: "16:00 - 18:00" }, { day: 'Thu', time: "16:00 - 18:00" }] },
      { name: "Dr. Debasis Sardar", qualification: "MD.,DM.", schedule: [{ day: 'Tue', time: "17:00 - 19:00" }] },
      { name: "Dr. Sugata Narayan Biswas", qualification: "MBBS,MD,DM", schedule: [{ day: 'Wed', time: "19:00 - 21:00" }, { day: 'Sat', time: "19:00 - 21:00" }] },
      { name: "Dr. Tuhin Mitra", qualification: "MD,DM.", schedule: [{ day: 'Wed', time: "17:00 - 19:00" }] },
      { name: "Dr. Uddeepta Dutta", qualification: "MBBS,MD,DM,MRCP", schedule: [{ day: 'Sun', time: "12:00 - 14:00" }] },
    ] },
    { id: 'general-physician', name: 'General Physician', doctors: [
      { name: "Dr. K.K.Sarda", qualification: "MBBS,DIP CARD", schedule: [{ day: 'Tue', time: "10:00 - 11:00" }, { day: 'Thu', time: "10:00 - 11:00" }, { day: 'Sat', time: "10:00 - 11:00" }] },
      { name: "Dr. P.K.Das", qualification: "MBBS,FAGP", schedule: [{ day: 'Tue', time: "10:00 - 13:00" }, { day: 'Thu', time: "10:00 - 13:00" }, { day: 'Sat', time: "10:00 - 13:00" }] },
    ] },
    { id: 'general-surgeon', name: 'General Surgeon', doctors: [
      { name: "Dr. Nilay Biswas", qualification: "MBBS,MS", schedule: [{ day: 'Mon', time: "19:00 - 21:00" }, { day: 'Thu', time: "19:00 - 21:00" }] },
      { name: "Dr. Suvro Ganguly", qualification: "MS,MRCS", schedule: [{ day: 'Mon', time: "11:00 - 13:00" }, { day: 'Wed', time: "11:00 - 13:00" }, { day: 'Fri', time: "11:00 - 13:00" }] },
      { name: "Dr. T A Ghazali", qualification: "MBBS,MS", schedule: [{ day: 'Tue', time: "13:00 - 14:00" }] },
    ] },
    { id: 'gynaecology', name: 'Gynaecology', doctors: [
      { name: "Dr. Fakhra Masroor", qualification: "MBBS,DNB(OBS&GYN)", schedule: [{ day: 'Wed', time: "13:00 - 15:00" }, { day: 'Fri', time: "18:00 - 20:00" }] },
      { name: "Dr. Marium Haque", qualification: "MBBS, MD (G&O)", schedule: [{ day: 'Thu', time: "10:00 - 12:00" }] },
      { name: "Dr. Nishat Parveen Begg", qualification: "MS,MRCOG,DNB", schedule: [{ day: 'Wed', time: "15:00 - 17:00" }, { day: 'Sun', time: "10:00 - 12:00" }] },
      { name: "Dr. Priya Tiwari", qualification: "MBBS,MS,DNB", schedule: [{ day: 'Sun', time: "11:00 - 13:00" }] },
      { name: "Dr. Sanjay Kr. Biswas", qualification: "MBBS.,DGO.,MD.", schedule: [{ day: 'Wed', time: "19:00 - 21:00" }, { day: 'Sat', time: "19:00 - 21:00" }] },
      { name: "Dr. Sanjukta Sarkar", qualification: "DGO,MRCOG", schedule: [{ day: 'Tue', time: "11:00 - 13:00" }, { day: 'Fri', time: "11:00 - 13:00" }] },
      { name: "Dr. Shabana Munshi", qualification: "MBBS,DGO,DNB", schedule: [{ day: 'Tue', time: "18:00 - 20:00" }, { day: 'Thu', time: "12:00 - 14:00" }, { day: 'Sat', time: "12:00 - 14:00" }] },
      { name: "Dr. Soma Datta", qualification: "MS.(G&O)", schedule: [{ day: 'Mon', time: "16:00 - 18:00" }, { day: 'Wed', time: "16:00 - 18:00" }, { day: 'Fri', time: "16:00 - 18:00" }] },
    ] },
    { id: 'haematology', name: 'Haematology', doctors: [
      { name: "Dr. Rajib De", qualification: "MD DM", schedule: [{ day: 'Mon', time: "16:00 - 18:00" }, { day: 'Fri', time: "16:00 - 18:00" }] },
      { name: "Dr. Shazia Gulshan", qualification: "MD, DM", schedule: [{ day: 'Wed', time: "17:00 - 18:00" }, { day: 'Sat', time: "17:00 - 18:00" }] },
    ] },
    { id: 'infectious-diseases', name: 'Infectious Diseases', doctors: [
      { name: "Dr. Soumendra Nath Haldar", qualification: "MD,DM", schedule: [{ day: 'Wed', time: "16:00 - 17:00" }] },
    ] },
    { id: 'medicine', name: 'Medicine', doctors: [
      { name: "Dr. H.Akhtar", qualification: "MD,FCCP", schedule: [{ day: 'Mon', time: "15:00 - 17:00" }, { day: 'Tue', time: "15:00 - 17:00" }, { day: 'Wed', time: "15:00 - 17:00" }, { day: 'Thu', time: "15:00 - 17:00" }, { day: 'Fri', time: "15:00 - 17:00" }, { day: 'Sat', time: "15:00 - 17:00" }, { day: 'Sun', time: "13:00 - 15:00" }] },
      { name: "Dr. Soham Das Bakshi", qualification: "MBBS,MD OPD", schedule: [{ day: 'Mon', time: "11:00 - 13:00" }, { day: 'Wed', time: "11:00 - 13:00" }] },
      { name: "Dr. Somnath Sarkar", qualification: "MBBS,MD", schedule: [{ day: 'Tue', time: "19:00 - 21:00" }, { day: 'Thu', time: "19:00 - 21:00" }] },
      { name: "Dr. Sourav Mukherjee", qualification: "MBBS,MD OPD", schedule: [{ day: 'Wed', time: "17:00 - 19:00" }, { day: 'Fri', time: "17:00 - 19:00" }, { day: 'Sun', time: "17:00 - 19:00" }] },
      { name: "Dr. Sujata Choudhury", qualification: "", schedule: [] },
      { name: "Dr. Sujata Mazumdar", qualification: "MBBS,MD", schedule: [{ day: 'Mon', time: "17:00 - 19:00" }] },
      { name: "Dr. Sujoy Panchadhyayee", qualification: "MBBS,MD,MRCP", schedule: [{ day: 'Mon', time: "17:00 - 19:00" }, { day: 'Tue', time: "17:00 - 19:00" }, { day: 'Wed', time: "17:00 - 19:00" }, { day: 'Thu', time: "17:00 - 19:00" }, { day: 'Fri', time: "17:00 - 19:00" }, { day: 'Sat', time: "17:00 - 19:00" }] },
      { name: "Dr. Swapan Sarkar", qualification: "MD.MED.", schedule: [{ day: 'Tue', time: "17:00 - 19:00" }, { day: 'Fri', time: "10:00 - 12:00" }] },
    ] },
    { id: 'nephrology', name: 'Nephrology', doctors: [
      { name: "Dr. Manik Kataruka", qualification: "MD,DM.", schedule: [{ day: 'Tue', time: "09:00 - 11:00" }, { day: 'Thu', time: "09:00 - 11:00" }] },
      { name: "Dr. Pinaki Mukherjee", qualification: "MD,DM", schedule: [{ day: 'Mon', time: "10:00 - 12:00" }, { day: 'Tue', time: "10:00 - 12:00" }, { day: 'Wed', time: "10:00 - 12:00" }, { day: 'Thu', time: "10:00 - 12:00" }, { day: 'Fri', time: "10:00 - 12:00" }, { day: 'Sat', time: "10:00 - 12:00" }] },
      { name: "Dr. Taniya Bhuiya", qualification: "MD,DM", schedule: [{ day: 'Sat', time: "09:00 - 11:00" }] },
      { name: "Dr. Tapabrata Das", qualification: "MD,DM", schedule: [{ day: 'Wed', time: "17:00 - 19:00" }, { day: 'Fri', time: "15:00 - 17:00" }] },
    ] },
    { id: 'neuro-medicine', name: 'Neuro Medicine', doctors: [
      { name: "Dr. Ankur Banik", qualification: "MD,DM", schedule: [{ day: 'Mon', time: "18:00 - 20:00" }, { day: 'Thu', time: "16:00 - 18:00" }] },
      { name: "Dr. Ansu Sen", qualification: "MD,DM", schedule: [{ day: 'Tue', time: "12:00 - 14:00" }, { day: 'Sat', time: "17:00 - 19:00" }] },
      { name: "Dr. Barun Kumar Sen", qualification: "MD,DM", schedule: [{ day: 'Tue', time: "18:00 - 20:00" }, { day: 'Thu', time: "18:00 - 20:00" }] },
      { name: "Dr. Shankar Prasad Saha", qualification: "MD.,DM.", schedule: [{ day: 'Mon', time: "09:00 - 10:00" }, { day: 'Wed', time: "09:00 - 10:00" }, { day: 'Fri', time: "09:00 - 10:00" }] },
    ] },
    { id: 'orthopaedic-surgeon', name: 'Orthopaedic Surgeon', doctors: [
      { name: "Dr. Abhik Ray", qualification: "MBBS,MS", schedule: [{ day: 'Tue', time: "15:00 - 17:00" }, { day: 'Thu', time: "15:00 - 17:00" }] },
      { name: "Dr. Ashoke Kr. Chanda", qualification: "MS(ORTHO), D.ORTHO", schedule: [{ day: 'Mon', time: "17:00 - 19:00" }, { day: 'Tue', time: "08:00 - 10:00" }, { day: 'Thu', time: "17:00 - 19:00" }, { day: 'Fri', time: "08:00 - 10:00" }, { day: 'Sat', time: "17:00 - 19:00" }] },
      { name: "Dr. Chandrachur Bhattacharyya", qualification: "D.ORTHO MS (ORTHO)", schedule: [{ day: 'Tue', time: "15:00 - 17:00" }, { day: 'Wed', time: "17:00 - 19:00" }, { day: 'Fri', time: "17:00 - 19:00" }] },
      { name: "Dr. Debasis Datta", qualification: "MS", schedule: [{ day: 'Mon', time: "12:00 - 14:00" }, { day: 'Wed', time: "12:00 - 14:00" }, { day: 'Fri', time: "12:00 - 14:00" }] },
      { name: "Dr. Kaunteya Ghosh", qualification: "MBBS,MS", schedule: [{ day: 'Sat', time: "15:30 - 17:30" }] },
      { name: "Dr. Soham Ghosh", qualification: "MBBS,MS,MCH", schedule: [{ day: 'Tue', time: "18:00 - 20:00" }] },
    ] },
    { id: 'paediatric', name: 'Paediatric', doctors: [
      { name: "Dr. Debangana Chatterjee", qualification: "MBBS,MD,DNB,MRCPCH", schedule: [{ day: 'Thu', time: "12:00 - 14:00" }] },
      { name: "Dr. Kajari Biswas (Sarkar)", qualification: "MBBS,DCH,MD OPD", schedule: [{ day: 'Wed', time: "14:00 - 16:00" }, { day: 'Sat', time: "14:00 - 16:00" }, { day: 'Sun', time: "15:00 - 17:00" }] },
      { name: "Dr. Meghdeep Mukhopadhyay", qualification: "MBBS, MD", schedule: [{ day: 'Mon', time: "14:00 - 16:00" }, { day: 'Fri', time: "14:00 - 16:00" }] },
      { name: "Dr. Shinjini Chakraborty", qualification: "MBBS,MD", schedule: [{ day: 'Tue', time: "10:00 - 12:00" }, { day: 'Thu', time: "10:00 - 12:00" }, { day: 'Sat', time: "10:00 - 12:00" }] },
      { name: "Dr. Surajit Santra", qualification: "MBBS,DCH,DNB", schedule: [{ day: 'Thu', time: "16:00 - 18:00" }, { day: 'Sat', time: "16:00 - 18:00" }] },
      { name: "Dr. Syed Mahammad Azad", qualification: "MBBS,MD", schedule: [{ day: 'Tue', time: "15:00 - 17:00" }, { day: 'Thu', time: "15:00 - 17:00" }, { day: 'Sat', time: "16:00 - 18:00" }, { day: 'Sun', time: "11:00 - 13:00" }] },
    ] },
    { id: 'paediatric-cardio', name: 'Paediatric Cardio', doctors: [
      { name: "Dr. Shyamajit Samaddar", qualification: "MD,DM", schedule: [{ day: 'Wed', time: "20:00 - 21:00" }] },
    ] },
    { id: 'psychiatry', name: 'Psychiatry', doctors: [
      { name: "Dr. Srijit Ghosh", qualification: "MD", schedule: [{ day: 'Tue', time: "14:00 - 16:00" }, { day: 'Thu', time: "14:00 - 16:00" }, { day: 'Sat', time: "14:00 - 16:00" }] },
    ] },
    { id: 'rheumatology', name: 'Rheumatology', doctors: [
      { name: "Dr. Selim Mondal", qualification: "MD,DM", schedule: [{ day: 'Tue', time: "14:00 - 16:00" }] },
      { name: "Dr. Angan Karmakar", qualification: "MD,DM", schedule: [{ day: 'Fri', time: "15:00 - 17:00" }] },
    ] },
    { id: 'urology', name: 'Urology', doctors: [
      { name: "Dr. Ankit Agarwal", qualification: "MBBS,MS,MCH", schedule: [{ day: 'Sat', time: "14:00 - 16:00" }] },
      { name: "Dr. Dipankar Bera", qualification: "MS,MCH", schedule: [{ day: 'Wed', time: "10:00 - 11:00" }] },
      { name: "Dr. Nilanjan Mitra", qualification: "MS,MCH", schedule: [{ day: 'Thu', time: "09:00 - 11:00" }] },
      { name: "Dr. Ranjan Kumar Dey", qualification: "MS,MCH", schedule: [{ day: 'Tue', time: "11:00 - 13:00" }, { day: 'Fri', time: "00:00 - 14:00" }] },
    ] },
  ],
  malda: [
    { id: 'cardiothoracic-surgeon', name: 'Cardiothoracic Surgeon', doctors: [
      { name: "Dr. Arup Kumar Ghosh", qualification: "MS, FRCS (C.TH)", schedule: [{ day: 'Sun', time: "11:30 - 17:00" }] },
    ] },
    { id: 'cardiology', name: 'Cardiology', doctors: [
      { name: "Dr. Abhirup Sinha", qualification: "MD, DM (CARDIOLOGY)", schedule: [{ day: 'Tue', time: "13:00 - 17:00" }] },
      { name: "Dr. Arindam Basu", qualification: "MD, DM (CARDIOLOGY)", schedule: [{ day: 'Fri', time: "10:00 - 16:00" }, { day: 'Sat', time: "10:00 - 16:00" }, { day: 'Sun', time: "10:00 - 16:00" }] },
      { name: "Dr. Arnab Ghosh Chaudhury", qualification: "MD, DM (CARDIOLOGY)", schedule: [{ day: 'Sat', time: "10:00 - 17:00" }, { day: 'Sun', time: "10:00 - 16:00" }] },
      { name: "Dr. B.P.Chattopadhyay", qualification: "MD, DM (CARDIOLOGY)", schedule: [{ day: 'Sun', time: "08:00 - 17:00" }] },
      { name: "Dr. Debdatta Majumdar", qualification: "MD, DM (CARDIOLOGY), MRCP", schedule: [{ day: 'Sun', time: "09:00 - 16:00" }] },
      { name: "Dr. Debopriyo Mondal", qualification: "MD, DM (CARDIOLOGY)", schedule: [{ day: 'Tue', time: "12:00 - 15:00" }] },
      { name: "Dr. Md.Saiyed Rana", qualification: "MD, DNB (CARDIOLOGY)", schedule: [{ day: 'Sat', time: "09:00 - 16:00" }] },
      { name: "Dr. Pradyot Kr. Jha", qualification: "MD, MRCP", schedule: [{ day: 'Sun', time: "10:00 - 17:00" }] },
      { name: "Dr. Prajjal Kumar Sinha", qualification: "MD, DM (CARDIOLOGY)", schedule: [{ day: 'Wed', time: "10:00 - 15:00" }] },
      { name: "Dr. Pramit Kumar Maji", qualification: "MD, DM (CARDIOLOGY)", schedule: [{ day: 'Mon', time: "13:00 - 15:00" }] },
      { name: "Dr. Pranabananda Pal", qualification: "MD, DM (CARDIOLOGY)", schedule: [{ day: 'Wed', time: "12:00 - 15:00" }, { day: 'Fri', time: "12:00 - 15:00" }] },
      { name: "Dr. Saptarshi Haldar", qualification: "MD, DM (CARDIOLOGY)", schedule: [{ day: 'Wed', time: "12:00 - 15:00" }] },
      { name: "Dr. Shuvadeep Sarkar", qualification: "MD, DM (CARDIOLOGY)", schedule: [{ day: 'Mon', time: "12:00 - 15:00" }] },
      { name: "Dr. Sk.Rafijuddin Ahamed", qualification: "MD, DM (CARDIOLOGY)", schedule: [{ day: 'Mon', time: "00:00 - 15:00" }, { day: 'Tue', time: "11:00 - 15:00" }, { day: 'Wed', time: "11:00 - 15:00" }, { day: 'Thu', time: "11:00 - 15:00" }, { day: 'Fri', time: "12:00 - 15:00" }, { day: 'Sat', time: "11:00 - 15:00" }] },
      { name: "Dr. Soumik Ghosh", qualification: "MD, DM (CARDIOLOGY)", schedule: [{ day: 'Sat', time: "10:00 - 16:00" }, { day: 'Sun', time: "10:00 - 16:00" }] },
      { name: "Dr. Subhra Aditya", qualification: "MD, DM (CARDIOLOGY)", schedule: [{ day: 'Sat', time: "12:00 - 16:00" }] },
      { name: "Dr. Subhro Sekhar Chakraborty", qualification: "MD, DM (CARDIOLOGY)", schedule: [{ day: 'Wed', time: "12:00 - 16:00" }] },
    ] },
    { id: 'chest-medicine', name: 'Chest Medicine', doctors: [
      { name: "Dr. H.Das", qualification: "DTM & H, MD (TB & RESPIRATORY DIS.)", schedule: [{ day: 'Sat', time: "11:00 - 17:00" }] },
      { name: "Dr. M.N.Hoque", qualification: "MBBS, DPH, MD(RESPIRATORY MEDICINE)", schedule: [{ day: 'Mon', time: "16:00 - 18:00" }, { day: 'Tue', time: "16:00 - 18:00" }, { day: 'Thu', time: "16:00 - 18:00" }] },
      { name: "Dr. Priyanka Ghosh", qualification: "MD (PULMONARY MED), DNB (RESPIRATORY DIS.)", schedule: [{ day: 'Mon', time: "10:00 - 16:00" }, { day: 'Sun', time: "10:00 - 16:00" }] },
      { name: "Dr. Sourav Mozumder", qualification: "MBBS, MD (RESPIRATORY MEDICINE)", schedule: [{ day: 'Wed', time: "10:00 - 13:00" }, { day: 'Thu', time: "17:00 - 18:00" }, { day: 'Thu', time: "10:00 - 13:00" }, { day: 'Fri', time: "17:00 - 18:00" }, { day: 'Fri', time: "10:00 - 13:00" }, { day: 'Sat', time: "17:00 - 18:00" }, { day: 'Sat', time: "10:00 - 13:00" }] },
    ] },
    { id: 'dermatology', name: 'Dermatology', doctors: [
      { name: "Dr. Md.Rahamat", qualification: "MBBS, MD (DERM.VEN. & LEP)", schedule: [{ day: 'Sat', time: "15:00 - 17:00" }, { day: 'Sat', time: "10:30 - 14:00" }] },
      { name: "Dr. Nilendu Sarma", qualification: "MBBS, MD (DERM. VEN & LEP),F.R.C.P.", schedule: [{ day: 'Wed', time: "14:00 - 15:00" }, { day: 'Wed', time: "09:00 - 10:00" }, { day: 'Thu', time: "14:00 - 15:00" }, { day: 'Thu', time: "09:00 - 10:00" }] },
      { name: "Dr. P.K.Datta", qualification: "MBBS, MD (DERMATOLOGY)", schedule: [{ day: 'Sun', time: "09:00 - 14:00" }] },
      { name: "Dr. R.Chaudhuri", qualification: "MBBS, MD (DERM.VEN & LEP)", schedule: [{ day: 'Mon', time: "17:00 - 18:00" }, { day: 'Mon', time: "10:00 - 13:00" }, { day: 'Tue', time: "17:00 - 18:00" }, { day: 'Tue', time: "10:00 - 13:00" }, { day: 'Wed', time: "17:00 - 18:00" }, { day: 'Wed', time: "10:00 - 13:00" }, { day: 'Thu', time: "17:00 - 18:00" }, { day: 'Thu', time: "10:00 - 13:00" }, { day: 'Fri', time: "17:00 - 18:00" }, { day: 'Fri', time: "10:00 - 13:00" }] },
    ] },
    { id: 'ent-surgeon', name: 'ENT Surgeon', doctors: [
      { name: "Dr. Amrita Basu", qualification: "MBBS, MS (ENT)", schedule: [{ day: 'Mon', time: "09:30 - 10:30" }, { day: 'Tue', time: "09:30 - 10:30" }, { day: 'Wed', time: "09:30 - 10:30" }, { day: 'Thu', time: "09:30 - 10:30" }, { day: 'Fri', time: "09:30 - 10:30" }] },
      { name: "Dr. Bikramjit Dhar", qualification: "MBBS, MS (ENT)", schedule: [{ day: 'Mon', time: "19:00 - 19:30" }, { day: 'Mon', time: "09:30 - 14:00" }, { day: 'Tue', time: "19:00 - 19:30" }, { day: 'Tue', time: "09:30 - 14:00" }, { day: 'Wed', time: "19:00 - 19:30" }, { day: 'Wed', time: "09:30 - 14:00" }, { day: 'Thu', time: "19:00 - 19:30" }, { day: 'Thu', time: "09:30 - 14:00" }, { day: 'Fri', time: "19:00 - 19:30" }, { day: 'Fri', time: "09:30 - 14:00" }, { day: 'Sat', time: "19:00 - 19:30" }, { day: 'Sat', time: "09:30 - 14:00" }, { day: 'Sun', time: "09:30 - 14:00" }] },
      { name: "Dr. Kallol Pal", qualification: "MBBS, DLO", schedule: [{ day: 'Sun', time: "09:00 - 17:00" }] },
      { name: "Dr. Md.Khurshid Pervej", qualification: "MBBS, MS (ENT)", schedule: [{ day: 'Mon', time: "18:30 - 19:00" }, { day: 'Mon', time: "10:00 - 14:00" }, { day: 'Tue', time: "18:30 - 19:00" }, { day: 'Tue', time: "10:00 - 14:00" }, { day: 'Wed', time: "18:30 - 19:00" }, { day: 'Wed', time: "10:00 - 14:00" }, { day: 'Thu', time: "18:30 - 19:00" }, { day: 'Thu', time: "10:00 - 14:00" }, { day: 'Fri', time: "18:30 - 19:00" }, { day: 'Fri', time: "10:00 - 14:00" }, { day: 'Sat', time: "18:30 - 19:00" }, { day: 'Sat', time: "10:00 - 14:00" }, { day: 'Sun', time: "11:00 - 14:00" }] },
      { name: "Dr. Saiyeda Zeba Islam", qualification: "MBBS, MS (ENT)", schedule: [{ day: 'Mon', time: "10:00 - 13:00" }, { day: 'Tue', time: "10:00 - 13:00" }, { day: 'Wed', time: "10:00 - 13:00" }, { day: 'Thu', time: "10:00 - 13:00" }, { day: 'Fri', time: "10:00 - 13:00" }, { day: 'Sat', time: "10:00 - 13:00" }] },
      { name: "Dr. Subhashis Roy", qualification: "MBBS, MS (ENT)", schedule: [{ day: 'Mon', time: "10:00 - 15:00" }, { day: 'Tue', time: "10:00 - 15:00" }, { day: 'Wed', time: "10:00 - 15:00" }, { day: 'Thu', time: "10:00 - 15:00" }, { day: 'Fri', time: "10:00 - 15:00" }, { day: 'Sat', time: "10:00 - 15:00" }] },
    ] },
    { id: 'endocrinology', name: 'Endocrinology', doctors: [
      { name: "Dr. Abhirup Banerjee", qualification: "MD, DM (ENDOCRINOLOGY)", schedule: [{ day: 'Thu', time: "09:00 - 16:00" }] },
      { name: "Dr. Arijit Singha", qualification: "MD, DM (ENDOCRINOLOGY)", schedule: [{ day: 'Sun', time: "09:00 - 17:00" }] },
      { name: "Dr. Arindam Ray", qualification: "MD, DM (ENDOCRINOLOGY)", schedule: [{ day: 'Thu', time: "09:00 - 18:00" }, { day: 'Sun', time: "09:00 - 18:00" }] },
      { name: "Dr. D.Biswas", qualification: "MD, DM (ENDOCRINOLOGY)", schedule: [{ day: 'Fri', time: "09:00 - 18:00" }, { day: 'Sat', time: "09:00 - 18:00" }, { day: 'Sun', time: "09:00 - 18:00" }] },
      { name: "Dr. Md.Ramiz Raja", qualification: "MD, DM (ENDOCRINOLOGY)", schedule: [{ day: 'Mon', time: "09:00 - 16:00" }] },
      { name: "Dr. Silima S.Tarenia", qualification: "MD, DM (ENDOCRINOLOGY)", schedule: [{ day: 'Fri', time: "09:30 - 17:00" }, { day: 'Sun', time: "09:30 - 17:00" }] },
      { name: "Dr. Soham Tarafdar", qualification: "MD, DM (ENDOCRINOLOGY)", schedule: [{ day: 'Sat', time: "09:00 - 17:00" }, { day: 'Sun', time: "09:00 - 17:00" }] },
      { name: "Dr. Soumita Mandal", qualification: "MD, DM (ENDOCRINOLOGY)", schedule: [{ day: 'Thu', time: "09:00 - 16:00" }] },
      { name: "Dr. T.Sanyal", qualification: "MD, DM (ENDOCRINOLOGY)", schedule: [{ day: 'Mon', time: "10:00 - 17:00" }, { day: 'Sun', time: "10:00 - 17:00" }] },
    ] },
    { id: 'gastroenterology', name: 'Gastroenterology', doctors: [
      { name: "Dr. Abhijit Chowdhury", qualification: "MD, DM (GASTROENTEROLGY)", schedule: [{ day: 'Thu', time: "09:00 - 14:00" }] },
      { name: "Dr. Ankan Saha", qualification: "MD, DM (GASTROENTEROLOGY)", schedule: [{ day: 'Mon', time: "16:00 - 18:00" }, { day: 'Sun', time: "16:00 - 18:00" }] },
      { name: "Dr. Anup Sarkar", qualification: "MD, DM (GASTROENTEROLOGY)", schedule: [{ day: 'Wed', time: "16:00 - 18:00" }] },
      { name: "Dr. Arnab Sarkar", qualification: "MD, DRNB (GASTROENTEROLOGY)", schedule: [{ day: 'Wed', time: "16:00 - 18:00" }] },
      { name: "Dr. Biswajit Banik", qualification: "MD, DM (GASTROENTEROLOGIST)", schedule: [{ day: 'Wed', time: "16:00 - 18:00" }, { day: 'Fri', time: "16:00 - 18:00" }, { day: 'Sat', time: "16:00 - 18:00" }, { day: 'Sun', time: "16:00 - 18:00" }] },
      { name: "Dr. Chandan Kumar Das", qualification: "MD, DM (GASTROENTEROLOGY)", schedule: [{ day: 'Fri', time: "16:00 - 18:00" }, { day: 'Sat', time: "16:00 - 18:00" }, { day: 'Sun', time: "16:00 - 18:00" }] },
      { name: "Dr. Chandan Sharma", qualification: "MD, DM (GASTROENTEROLOGY)", schedule: [{ day: 'Sat', time: "16:00 - 18:00" }, { day: 'Sun', time: "16:00 - 18:00" }] },
      { name: "Dr. Rahul Malind Gupta", qualification: "MD, DM (GASTROENTEROLOGY)", schedule: [{ day: 'Mon', time: "16:00 - 18:00" }, { day: 'Sun', time: "16:00 - 18:00" }] },
      { name: "Dr. Souradip Mukherjee", qualification: "MD, DM (GASTROENTEROLOGY)", schedule: [{ day: 'Tue', time: "16:00 - 18:00" }] },
    ] },
    { id: 'general-physician', name: 'General Physician', doctors: [
      { name: "Dr. Pranabes Ray", qualification: "MBBS, MD (PHYSIOLOGY)", schedule: [{ day: 'Mon', time: "10:00 - 17:00" }, { day: 'Tue', time: "10:00 - 17:00" }, { day: 'Wed', time: "10:00 - 17:00" }, { day: 'Thu', time: "10:00 - 17:00" }, { day: 'Fri', time: "10:00 - 17:00" }, { day: 'Sat', time: "10:00 - 17:00" }, { day: 'Sun', time: "11:00 - 15:00" }] },
      { name: "Dr. Sudipta Ray", qualification: "MBBS", schedule: [{ day: 'Mon', time: "15:00 - 15:30" }, { day: 'Tue', time: "15:00 - 15:30" }, { day: 'Wed', time: "15:00 - 15:30" }, { day: 'Thu', time: "15:00 - 15:30" }, { day: 'Fri', time: "15:00 - 15:30" }, { day: 'Sat', time: "15:00 - 15:30" }] },
    ] },
    { id: 'gynaecology', name: 'Gynaecology', doctors: [
      { name: "Dr. Agami Bhowmick", qualification: "MBBS, MS (OBST. & GYNAE.)", schedule: [{ day: 'Mon', time: "17:00 - 18:00" }, { day: 'Mon', time: "09:00 - 13:00" }, { day: 'Tue', time: "17:00 - 18:00" }, { day: 'Tue', time: "09:00 - 13:00" }, { day: 'Wed', time: "17:00 - 18:00" }, { day: 'Wed', time: "09:00 - 13:00" }, { day: 'Thu', time: "17:00 - 18:00" }, { day: 'Thu', time: "09:00 - 13:00" }, { day: 'Fri', time: "09:00 - 10:00" }, { day: 'Sat', time: "17:00 - 18:00" }, { day: 'Sat', time: "09:00 - 13:00" }, { day: 'Sun', time: "17:00 - 18:00" }, { day: 'Sun', time: "09:00 - 13:00" }] },
      { name: "Dr. Amrita Sarkar", qualification: "MBBS, DGO", schedule: [{ day: 'Mon', time: "10:00 - 12:00" }, { day: 'Tue', time: "10:00 - 12:00" }, { day: 'Wed', time: "10:00 - 12:00" }, { day: 'Thu', time: "10:00 - 12:00" }, { day: 'Fri', time: "10:00 - 12:00" }] },
      { name: "Dr. Kalyan Kr Misra", qualification: "DGO, MD (OBST. & GYNAE.)", schedule: [{ day: 'Mon', time: "16:00 - 18:00" }, { day: 'Tue', time: "16:00 - 18:00" }, { day: 'Wed', time: "16:00 - 18:00" }, { day: 'Thu', time: "16:00 - 18:00" }, { day: 'Fri', time: "16:00 - 18:00" }, { day: 'Sat', time: "16:00 - 18:00" }] },
      { name: "Dr. Md.Kamal Hasan", qualification: "MBBS, MS (OBST & GYNAE)", schedule: [{ day: 'Mon', time: "17:00 - 18:00" }, { day: 'Mon', time: "09:00 - 13:00" }, { day: 'Tue', time: "17:00 - 18:00" }, { day: 'Tue', time: "09:00 - 13:00" }, { day: 'Wed', time: "17:00 - 18:00" }, { day: 'Wed', time: "09:00 - 13:00" }, { day: 'Thu', time: "17:00 - 18:00" }, { day: 'Thu', time: "09:00 - 13:00" }, { day: 'Fri', time: "17:00 - 18:00" }, { day: 'Fri', time: "09:00 - 13:00" }, { day: 'Sat', time: "17:00 - 18:00" }, { day: 'Sat', time: "09:00 - 13:00" }] },
      { name: "Dr. Rahul Chaudhuri", qualification: "MBBS, MS (OBST. & GYNAE.), DNB (OBST. & GYNAE.)", schedule: [{ day: 'Mon', time: "10:00 - 13:00" }, { day: 'Tue', time: "10:00 - 13:00" }, { day: 'Wed', time: "10:00 - 13:00" }, { day: 'Thu', time: "10:00 - 13:00" }, { day: 'Fri', time: "10:00 - 13:00" }] },
      { name: "Dr. Rupsa Majumdar", qualification: "MBBS, MS (OBST. & GYNAE.)", schedule: [{ day: 'Mon', time: "18:00 - 19:00" }, { day: 'Mon', time: "10:30 - 13:00" }, { day: 'Tue', time: "18:00 - 19:00" }, { day: 'Tue', time: "10:30 - 13:00" }, { day: 'Wed', time: "18:00 - 19:00" }, { day: 'Wed', time: "10:30 - 13:00" }, { day: 'Thu', time: "18:00 - 19:00" }, { day: 'Thu', time: "10:30 - 13:00" }, { day: 'Fri', time: "18:00 - 19:00" }, { day: 'Fri', time: "10:30 - 13:00" }, { day: 'Sat', time: "17:30 - 19:00" }, { day: 'Sat', time: "10:30 - 13:00" }] },
      { name: "Dr. Soumya Kanti Barman", qualification: "MBBS, MS (OBST. & GYNAE.)", schedule: [{ day: 'Mon', time: "15:00 - 16:00" }, { day: 'Tue', time: "15:00 - 16:00" }, { day: 'Wed', time: "15:00 - 16:00" }, { day: 'Thu', time: "15:00 - 16:00" }, { day: 'Fri', time: "15:00 - 16:00" }, { day: 'Sat', time: "15:00 - 16:00" }] },
    ] },
    { id: 'haematology', name: 'Haematology', doctors: [
      { name: "Dr. Kusumita Mandal (Roy)", qualification: "MD, DM (CLINICAL HAEMATOLOGY)", schedule: [{ day: 'Mon', time: "10:30 - 16:00" }, { day: 'Sat', time: "10:30 - 16:00" }] },
      { name: "Dr. Shazia Gulshan", qualification: "MD, DM (CLINICAL HAEMATOLOGY)", schedule: [{ day: 'Tue', time: "11:00 - 16:00" }, { day: 'Sun', time: "11:00 - 16:00" }] },
      { name: "Dr. Siddhartha Sankar Ray", qualification: "MD, DNB, DM (HAEMATOLOGY)", schedule: [{ day: 'Sun', time: "09:00 - 15:00" }] },
      { name: "Dr. Sisir Kumar Patra", qualification: "MD, DNB (HAEMATOLOGY)", schedule: [{ day: 'Sun', time: "09:00 - 16:00" }] },
      { name: "Dr. Sudip Roy", qualification: "MD, DM (CLINICAL HAEMATOLOGY)", schedule: [{ day: 'Mon', time: "09:00 - 16:00" }, { day: 'Fri', time: "09:00 - 16:00" }] },
    ] },
    { id: 'general-surgeon', name: 'General Surgeon', doctors: [
      { name: "Dr. Abhishek Mondal", qualification: "MBBS, MS (GENERAL SURGERY)", schedule: [{ day: 'Mon', time: "17:30 - 18:30" }, { day: 'Mon', time: "10:00 - 14:00" }, { day: 'Tue', time: "17:30 - 18:30" }, { day: 'Tue', time: "10:00 - 14:00" }, { day: 'Wed', time: "17:30 - 18:30" }, { day: 'Wed', time: "10:00 - 14:00" }, { day: 'Thu', time: "17:30 - 18:30" }, { day: 'Thu', time: "10:00 - 14:00" }, { day: 'Fri', time: "17:30 - 18:30" }, { day: 'Fri', time: "10:00 - 14:00" }, { day: 'Sat', time: "17:30 - 18:30" }, { day: 'Sat', time: "10:00 - 14:00" }, { day: 'Sun', time: "17:30 - 18:30" }, { day: 'Sun', time: "10:00 - 14:00" }] },
      { name: "Dr. D.Mabood", qualification: "MBBS, MS (GENERAL SURGERY)", schedule: [{ day: 'Mon', time: "11:00 - 13:00" }, { day: 'Tue', time: "11:00 - 13:00" }, { day: 'Wed', time: "11:00 - 13:00" }, { day: 'Thu', time: "11:00 - 13:00" }, { day: 'Fri', time: "11:00 - 12:00" }, { day: 'Sat', time: "11:00 - 13:00" }, { day: 'Sun', time: "11:00 - 12:00" }] },
      { name: "Dr. Debasis Dhar", qualification: "MBBS, MS (GENERAL SURGERY)", schedule: [{ day: 'Mon', time: "09:30 - 11:00" }, { day: 'Tue', time: "09:30 - 11:00" }, { day: 'Wed', time: "09:30 - 11:00" }, { day: 'Thu', time: "09:30 - 11:00" }, { day: 'Fri', time: "09:30 - 11:00" }] },
    ] },
    { id: 'medicine', name: 'Medicine', doctors: [
      { name: "Dr. Arun Kumar Saha", qualification: "MBBS, MD (MEDICINE)", schedule: [{ day: 'Mon', time: "15:00 - 18:00" }, { day: 'Tue', time: "18:00 - 19:00" }, { day: 'Tue', time: "10:00 - 13:00" }, { day: 'Wed', time: "18:00 - 19:00" }, { day: 'Wed', time: "10:00 - 13:00" }, { day: 'Thu', time: "18:00 - 19:00" }, { day: 'Thu', time: "10:00 - 13:00" }, { day: 'Fri', time: "18:00 - 19:00" }, { day: 'Fri', time: "10:00 - 13:00" }, { day: 'Sat', time: "18:00 - 19:00" }, { day: 'Sat', time: "10:00 - 13:00" }] },
      { name: "Dr. Asim Saha", qualification: "MBBS, MD (MEDICINE)", schedule: [{ day: 'Mon', time: "09:00 - 17:00" }, { day: 'Tue', time: "09:00 - 17:00" }, { day: 'Thu', time: "09:00 - 17:00" }, { day: 'Fri', time: "09:00 - 17:00" }, { day: 'Sat', time: "09:00 - 17:00" }] },
      { name: "Dr. Atanu Acharyya", qualification: "MBBS, MD (MEDICINE)", schedule: [{ day: 'Mon', time: "11:00 - 17:00" }, { day: 'Tue', time: "11:00 - 17:00" }, { day: 'Wed', time: "11:00 - 17:00" }, { day: 'Thu', time: "11:00 - 17:00" }, { day: 'Sat', time: "11:00 - 17:00" }, { day: 'Sun', time: "11:00 - 17:00" }] },
      { name: "Dr. Bapilal Bala", qualification: "MBBS, MD (MEDICINE)", schedule: [{ day: 'Mon', time: "09:00 - 12:00" }, { day: 'Tue', time: "09:00 - 12:00" }, { day: 'Wed', time: "09:00 - 12:00" }, { day: 'Thu', time: "09:00 - 12:00" }, { day: 'Fri', time: "09:00 - 12:00" }] },
      { name: "Dr. Bikram Kr.Saha", qualification: "MBBS, MD (MEDICINE)", schedule: [{ day: 'Mon', time: "15:00 - 18:00" }, { day: 'Tue', time: "14:00 - 18:00" }, { day: 'Wed', time: "14:00 - 18:00" }, { day: 'Thu', time: "14:00 - 18:00" }, { day: 'Fri', time: "14:00 - 18:00" }, { day: 'Sat', time: "14:00 - 18:00" }] },
      { name: "Dr. Pijush Kanti Mandal", qualification: "MBBS, MD (MEDICINE)", schedule: [{ day: 'Mon', time: "17:00 - 19:00" }, { day: 'Mon', time: "10:30 - 16:00" }, { day: 'Tue', time: "17:00 - 19:00" }, { day: 'Tue', time: "10:30 - 16:00" }, { day: 'Wed', time: "17:00 - 19:00" }, { day: 'Wed', time: "10:30 - 16:00" }, { day: 'Thu', time: "17:00 - 19:00" }, { day: 'Thu', time: "12:00 - 16:00" }, { day: 'Sat', time: "17:00 - 19:00" }, { day: 'Sat', time: "12:00 - 16:00" }] },
      { name: "Dr. Sankha Jyoti Saha", qualification: "MBBS, MD (MEDICINE)", schedule: [{ day: 'Mon', time: "17:30 - 18:00" }, { day: 'Mon', time: "10:00 - 14:00" }, { day: 'Tue', time: "17:30 - 18:00" }, { day: 'Tue', time: "10:00 - 14:00" }, { day: 'Wed', time: "17:30 - 18:00" }, { day: 'Wed', time: "10:00 - 14:00" }, { day: 'Thu', time: "17:30 - 18:00" }, { day: 'Thu', time: "10:00 - 14:00" }, { day: 'Fri', time: "17:30 - 18:00" }, { day: 'Fri', time: "10:00 - 14:00" }, { day: 'Sat', time: "17:30 - 18:00" }, { day: 'Sat', time: "10:00 - 14:00" }, { day: 'Sun', time: "10:00 - 14:00" }] },
      { name: "Dr. Sk.Rousan Zaman", qualification: "MBBS, MD (MEDICINE)", schedule: [{ day: 'Mon', time: "10:00 - 17:00" }, { day: 'Tue', time: "10:00 - 17:00" }, { day: 'Wed', time: "10:00 - 17:00" }, { day: 'Fri', time: "11:00 - 17:00" }, { day: 'Sat', time: "11:00 - 17:00" }] },
      { name: "Dr. Swapan Sarkar", qualification: "MBBS, MD (MEDICINE)", schedule: [{ day: 'Sat', time: "11:00 - 14:00" }, { day: 'Sun', time: "10:00 - 14:00" }] },
    ] },
    { id: 'nephrology', name: 'Nephrology', doctors: [
      { name: "Dr. Adyapad Pani", qualification: "MD, DM (NEPHROLOGY)", schedule: [{ day: 'Sun', time: "09:00 - 17:00" }] },
      { name: "Dr. Arjun Ray", qualification: "MD.,DM (NEPHROLOGY)", schedule: [{ day: 'Sun', time: "09:00 - 17:00" }] },
      { name: "Dr. Asit Kumar Mandal", qualification: "MD, DM (NEPHROLOGY)", schedule: [{ day: 'Fri', time: "09:00 - 16:00" }] },
      { name: "Dr. Himadri Koley", qualification: "MD, DM (NEPHROLOGY)", schedule: [{ day: 'Thu', time: "09:00 - 16:00" }] },
      { name: "Dr. Indradip Maity", qualification: "MD, DM (NEPHROLOGY)", schedule: [{ day: 'Sat', time: "10:30 - 16:00" }] },
      { name: "Dr. Keshab Sil", qualification: "MD, DM (NEPHROLOGY)", schedule: [{ day: 'Fri', time: "09:00 - 17:00" }, { day: 'Sun', time: "09:00 - 17:00" }] },
      { name: "Dr. Pinaki Mukhopadhyay", qualification: "MD, DM (NEPHROLOGY)", schedule: [{ day: 'Mon', time: "09:30 - 17:00" }, { day: 'Fri', time: "09:30 - 17:00" }, { day: 'Sat', time: "09:30 - 17:00" }, { day: 'Sun', time: "09:30 - 17:00" }] },
      { name: "Dr. Prasun Roy", qualification: "MD, DM (NEPHROLOGY)", schedule: [{ day: 'Sat', time: "09:00 - 17:00" }] },
      { name: "Dr. Puranjoy Chakrabarty", qualification: "MD, DM (NEPHROLOGY)", schedule: [{ day: 'Fri', time: "09:30 - 17:00" }, { day: 'Sun', time: "09:30 - 17:00" }] },
      { name: "Dr. Raj Narayan Mukherjee", qualification: "MD, DM (NEPHROLOGY)", schedule: [{ day: 'Sun', time: "09:00 - 16:00" }] },
      { name: "Dr. Rajarshi Datta", qualification: "MD, DM (NEPHROLOGY)", schedule: [{ day: 'Mon', time: "09:00 - 16:00" }] },
      { name: "Dr. Sunil Kumar", qualification: "MD, DM (NEPHROLOGY)", schedule: [{ day: 'Sun', time: "09:30 - 16:00" }] },
      { name: "Dr. Tapabrata Das", qualification: "MD, DM (NEPHROLOGY)", schedule: [{ day: 'Sat', time: "09:00 - 17:00" }, { day: 'Sun', time: "09:00 - 17:00" }] },
      { name: "Dr. Tathagata Mukherjee", qualification: "MD, DM (NEPHROLOGY)", schedule: [{ day: 'Mon', time: "09:00 - 16:00" }, { day: 'Sat', time: "09:00 - 16:00" }] },
      { name: "Dr. Uttayan Chakrabarti", qualification: "MD, DM (NEPHROLOGY)", schedule: [{ day: 'Sun', time: "09:00 - 16:00" }] },
      { name: "Dr. Vivek Goel", qualification: "MD, DRNB (NEPHROLOGY)", schedule: [{ day: 'Fri', time: "09:00 - 16:00" }] },
    ] },
    { id: 'neuro-surgery', name: 'Neuro Surgery', doctors: [
      { name: "Dr. Anurup Saha", qualification: "MS, MCH (NEUROSURGERY)", schedule: [{ day: 'Sat', time: "09:30 - 16:00" }, { day: 'Sun', time: "09:30 - 16:00" }] },
      { name: "Dr. Gopal Achari", qualification: "MS, MCH (NEUROSURGERY)", schedule: [{ day: 'Sun', time: "10:00 - 16:00" }] },
      { name: "Dr. Sudip Kumar Ghosh", qualification: "MS, DRNB (NEUROSURGERY)", schedule: [{ day: 'Sat', time: "09:00 - 16:00" }, { day: 'Sun', time: "09:00 - 16:00" }] },
      { name: "Dr. Susangato Choudhury", qualification: "MS, MCH (NEUROSURGERY)", schedule: [{ day: 'Fri', time: "09:30 - 16:00" }] },
      { name: "Dr. Tathagata Datta", qualification: "DNB, MCH (NEUROSURGERY)", schedule: [{ day: 'Tue', time: "10:00 - 14:00" }] },
      { name: "Dr. Ujjwal Kumar Biswas", qualification: "DCH, MS, MCH (NEUROSURGERY)", schedule: [{ day: 'Thu', time: "09:00 - 16:00" }, { day: 'Fri', time: "09:00 - 16:00" }, { day: 'Sat', time: "09:00 - 16:00" }] },
    ] },
    { id: 'neurology', name: 'Neurology', doctors: [
      { name: "Dr. Akash Manna", qualification: "MD, DM (NEUROLOGY)", schedule: [{ day: 'Sat', time: "09:00 - 16:00" }] },
      { name: "Dr. Amar Kumar Misra", qualification: "MD, DM (NEUROLOGY)", schedule: [{ day: 'Wed', time: "10:00 - 17:00" }] },
      { name: "Dr. Amlan Kusum Datta", qualification: "MD,DRNB,DM (NEUROLOGY)", schedule: [{ day: 'Thu', time: "09:00 - 17:00" }] },
      { name: "Dr. Anirban Ghosal", qualification: "MD, DM (NEUROLOGY)", schedule: [{ day: 'Sun', time: "09:00 - 17:00" }] },
      { name: "Dr. Anjan Debnath", qualification: "MD, DM (NEUROLOGY)", schedule: [{ day: 'Mon', time: "09:00 - 16:00" }] },
      { name: "Dr. Annesh Bhattacharjee", qualification: "MD, DM (NEUROLOGY), DRNB (NEUROLOGY)", schedule: [{ day: 'Fri', time: "09:00 - 17:00" }] },
      { name: "Dr. Arindam Das", qualification: "MD, DM (NEUROLOGY)", schedule: [{ day: 'Sat', time: "09:00 - 17:00" }] },
      { name: "Dr. Arindam Santra", qualification: "MD, DM (NEUROLOGY)", schedule: [{ day: 'Wed', time: "09:00 - 17:00" }] },
      { name: "Dr. Asutosh Pal", qualification: "MD, DM (NEUROLOGY)", schedule: [{ day: 'Thu', time: "09:00 - 17:00" }] },
      { name: "Dr. Bhaswar Bhattacharya", qualification: "MD, DNB, DM (NEUROLOGY)", schedule: [{ day: 'Sun', time: "09:00 - 16:00" }] },
      { name: "Dr. Dilip Roy", qualification: "MD, DM (NEUROLOGY)", schedule: [{ day: 'Mon', time: "09:00 - 17:00" }, { day: 'Sat', time: "09:00 - 17:00" }] },
      { name: "Dr. Dwaipayan Bhattacharyya", qualification: "MD, DM (NEUROLOGY)", schedule: [{ day: 'Mon', time: "09:00 - 17:00" }, { day: 'Sat', time: "09:00 - 17:00" }] },
      { name: "Dr. Joydeep Mukherjee", qualification: "DNB, DM (NEUROLOGY)", schedule: [{ day: 'Sun', time: "09:00 - 17:00" }] },
      { name: "Dr. Moukoli Pal", qualification: "MD, DM (NEUROLOGY)", schedule: [{ day: 'Mon', time: "09:00 - 16:00" }] },
      { name: "Dr. Mrinal Kumar Acharya", qualification: "MD, DM (NEUROLOGY)", schedule: [{ day: 'Sat', time: "09:00 - 17:00" }] },
      { name: "Dr. Pinaki Maiti", qualification: "MD, DM (NEUROLOGY)", schedule: [{ day: 'Mon', time: "09:00 - 16:00" }] },
      { name: "Dr. Santanu Sinha Mahapatra", qualification: "MD, DM (NEUROLOGY)", schedule: [{ day: 'Sun', time: "09:00 - 16:00" }] },
      { name: "Dr. Shambaditya Das", qualification: "MD, DM (NEUROLOGY)", schedule: [{ day: 'Thu', time: "09:00 - 17:00" }] },
      { name: "Dr. Shankar Prasad Saha", qualification: "MD, DM (NEUROLOGY)", schedule: [{ day: 'Sun', time: "08:00 - 15:00" }] },
      { name: "Dr. Sougata Bhattacharya", qualification: "MD, DM (NEUROLOGY)", schedule: [{ day: 'Fri', time: "09:00 - 17:00" }] },
      { name: "Dr. Soumyadeep Ghosh", qualification: "MD, DM (NEUROLOGY)", schedule: [{ day: 'Tue', time: "09:00 - 16:00" }, { day: 'Wed', time: "09:00 - 16:00" }] },
      { name: "Dr. Subhra Sankar Sen", qualification: "MD, DM (NEUROLOGY)", schedule: [{ day: 'Fri', time: "09:00 - 16:00" }, { day: 'Sat', time: "09:00 - 16:00" }] },
      { name: "Dr. Sumanta Sarkar", qualification: "MD, DM (NEUROLOGY)", schedule: [{ day: 'Tue', time: "09:00 - 16:00" }] },
      { name: "Dr. Uddalak Chakraborty", qualification: "MD, DM (NEUROLOGY), MRCP", schedule: [{ day: 'Wed', time: "09:00 - 16:00" }] },
    ] },
    { id: 'oncology', name: 'Oncology', doctors: [
      { name: "Dr. Swapan Kumar Mallick", qualification: "MBBS, MD (RADIO-THERAPY)", schedule: [{ day: 'Sun', time: "12:00 - 14:00" }] },
    ] },
    { id: 'ophthalmology', name: 'Ophthalmology', doctors: [
      { name: "Dr. Jayashree Chaudhuri", qualification: "MBBS, DO", schedule: [{ day: 'Mon', time: "11:00 - 15:00" }, { day: 'Tue', time: "11:00 - 15:00" }, { day: 'Wed', time: "11:00 - 15:00" }, { day: 'Thu', time: "11:00 - 15:00" }, { day: 'Fri', time: "11:00 - 15:00" }, { day: 'Sat', time: "11:00 - 15:00" }] },
    ] },
    { id: 'orthopaedic', name: 'Orthopaedic', doctors: [
      { name: "Dr. Sanjay Saha", qualification: "MBBS, MS (ORTHOPAEDICS)", schedule: [{ day: 'Mon', time: "17:30 - 18:30" }, { day: 'Mon', time: "10:30 - 13:00" }, { day: 'Tue', time: "17:30 - 18:30" }, { day: 'Tue', time: "10:30 - 13:00" }, { day: 'Wed', time: "17:30 - 18:30" }, { day: 'Wed', time: "10:30 - 13:00" }, { day: 'Thu', time: "17:30 - 18:30" }, { day: 'Thu', time: "10:30 - 13:00" }, { day: 'Sun', time: "17:30 - 18:30" }, { day: 'Sun', time: "10:30 - 13:00" }] },
      { name: "Dr. Subhodeep Mondal", qualification: "MBBS, D.ORTHO", schedule: [{ day: 'Mon', time: "18:00 - 19:00" }, { day: 'Mon', time: "11:00 - 14:00" }, { day: 'Tue', time: "11:00 - 13:00" }, { day: 'Wed', time: "18:00 - 19:00" }, { day: 'Wed', time: "11:00 - 14:00" }, { day: 'Thu', time: "18:00 - 19:00" }, { day: 'Thu', time: "11:00 - 14:00" }, { day: 'Fri', time: "18:00 - 19:00" }, { day: 'Fri', time: "11:00 - 14:00" }, { day: 'Sat', time: "18:00 - 19:00" }, { day: 'Sat', time: "11:00 - 14:00" }] },
      { name: "Dr. Sushovan Banerjee", qualification: "MBBS, MS (ORTHOPAEDICS)", schedule: [{ day: 'Mon', time: "18:00 - 19:00" }, { day: 'Mon', time: "09:00 - 10:30" }, { day: 'Tue', time: "18:00 - 19:00" }, { day: 'Tue', time: "09:00 - 10:30" }, { day: 'Wed', time: "18:00 - 19:00" }, { day: 'Wed', time: "09:00 - 10:30" }, { day: 'Thu', time: "18:00 - 19:00" }, { day: 'Thu', time: "09:00 - 10:30" }, { day: 'Fri', time: "18:00 - 19:00" }, { day: 'Fri', time: "09:00 - 10:30" }, { day: 'Sat', time: "18:00 - 19:00" }, { day: 'Sat', time: "09:00 - 10:30" }, { day: 'Sun', time: "18:00 - 19:00" }, { day: 'Sun', time: "09:00 - 10:30" }] },
    ] },
    { id: 'paediatric', name: 'Paediatric', doctors: [
      { name: "Dr. Aishwarya Paul", qualification: "MBBS, MD (PAEDIATRICS)", schedule: [{ day: 'Mon', time: "17:00 - 19:00" }, { day: 'Mon', time: "09:00 - 13:00" }, { day: 'Tue', time: "05:00 - 19:00" }, { day: 'Tue', time: "09:00 - 13:00" }, { day: 'Wed', time: "17:00 - 19:00" }, { day: 'Wed', time: "09:00 - 13:00" }, { day: 'Thu', time: "17:00 - 19:00" }, { day: 'Thu', time: "09:00 - 13:00" }, { day: 'Fri', time: "17:00 - 19:00" }, { day: 'Fri', time: "09:00 - 13:00" }, { day: 'Sat', time: "17:00 - 19:00" }, { day: 'Sat', time: "09:00 - 13:00" }, { day: 'Sun', time: "17:00 - 19:00" }, { day: 'Sun', time: "09:00 - 13:00" }] },
      { name: "Dr. Debanjan Sinha", qualification: "MBBS, DNB, MD (PAEDIATRICS)", schedule: [{ day: 'Mon', time: "17:00 - 18:00" }, { day: 'Mon', time: "10:00 - 13:00" }, { day: 'Sat', time: "17:00 - 18:00" }, { day: 'Sun', time: "17:00 - 18:00" }, { day: 'Sun', time: "10:00 - 13:00" }] },
      { name: "Dr. Gopal Pandey", qualification: "MD (PAEDIATRICS), DNB (PAEDIATRICS)", schedule: [{ day: 'Mon', time: "18:00 - 19:00" }, { day: 'Mon', time: "10:00 - 14:00" }, { day: 'Tue', time: "18:00 - 19:00" }, { day: 'Tue', time: "10:00 - 14:00" }, { day: 'Wed', time: "18:00 - 19:00" }, { day: 'Wed', time: "10:00 - 14:00" }, { day: 'Thu', time: "18:00 - 19:00" }, { day: 'Thu', time: "10:00 - 14:00" }, { day: 'Fri', time: "18:00 - 19:00" }, { day: 'Fri', time: "10:00 - 14:00" }, { day: 'Sat', time: "18:00 - 19:00" }, { day: 'Sat', time: "10:00 - 14:00" }, { day: 'Sun', time: "10:00 - 13:00" }] },
      { name: "Dr. Mohit Chitlangia", qualification: "MBBS, MD (PAEDIATRICS)", schedule: [{ day: 'Mon', time: "18:00 - 20:00" }, { day: 'Mon', time: "09:00 - 16:00" }, { day: 'Tue', time: "18:00 - 20:00" }, { day: 'Tue', time: "09:00 - 16:00" }, { day: 'Wed', time: "18:00 - 20:00" }, { day: 'Wed', time: "09:00 - 16:00" }, { day: 'Thu', time: "18:00 - 20:00" }, { day: 'Thu', time: "09:00 - 16:00" }, { day: 'Fri', time: "18:00 - 20:00" }, { day: 'Fri', time: "09:00 - 16:00" }, { day: 'Sat', time: "18:00 - 20:00" }, { day: 'Sat', time: "09:00 - 16:00" }, { day: 'Sun', time: "10:00 - 12:00" }] },
      { name: "Dr. S.Chaudhuri", qualification: "MBBS, DCH", schedule: [{ day: 'Mon', time: "17:30 - 18:30" }, { day: 'Mon', time: "10:00 - 12:00" }, { day: 'Tue', time: "10:00 - 12:00" }, { day: 'Wed', time: "17:30 - 18:30" }, { day: 'Wed', time: "10:00 - 12:00" }, { day: 'Thu', time: "17:30 - 18:30" }, { day: 'Thu', time: "10:00 - 12:00" }, { day: 'Fri', time: "17:30 - 18:30" }, { day: 'Fri', time: "10:00 - 12:00" }, { day: 'Sat', time: "17:30 - 18:30" }, { day: 'Sat', time: "10:00 - 12:00" }, { day: 'Sun', time: "17:30 - 18:30" }, { day: 'Sun', time: "11:00 - 12:00" }] },
      { name: "Dr. Ziaul Haque", qualification: "MBBS, MD (PAEDIATRICS)", schedule: [{ day: 'Mon', time: "07:00 - 11:00" }, { day: 'Tue', time: "07:00 - 11:00" }, { day: 'Wed', time: "07:00 - 11:00" }, { day: 'Thu', time: "07:00 - 11:00" }, { day: 'Fri', time: "07:00 - 11:00" }, { day: 'Sat', time: "07:00 - 11:00" }] },
    ] },
    { id: 'paediatric-cardiology', name: 'Paediatric Cardiology', doctors: [
      { name: "Dr. Shatanik Sarkar", qualification: "MD, DM (PAEDIATRIC CARDIOLOGY)", schedule: [{ day: 'Fri', time: "09:00 - 10:00" }, { day: 'Sat', time: "13:00 - 15:00" }, { day: 'Sun', time: "09:00 - 10:00" }] },
      { name: "Dr. Shyamajit Samaddar", qualification: "MD (PAEDIATRICS), DM (PAEDIATRIC CARDIOLOGY)", schedule: [{ day: 'Sat', time: "13:00 - 16:00" }] },
      { name: "Dr. Siddhartha Saha", qualification: "MD, DNB, DNB (PAEDIATRIC CARDIOLOGT)", schedule: [{ day: 'Tue', time: "12:00 - 14:00" }] },
      { name: "Dr. Sucheta Barman", qualification: "MD, DRNB (PAEDIATRIC CARDIOLOGY)", schedule: [{ day: 'Sat', time: "13:00 - 15:00" }] },
      { name: "Dr. Sudipta Bhattacharjya", qualification: "MD(PAEDIA), DNB(PAEDIA), FNB(PAEDIATRIC CARDIOLOGY)", schedule: [{ day: 'Mon', time: "13:00 - 15:00" }, { day: 'Thu', time: "13:00 - 15:00" }] },
    ] },
    { id: 'paediatric-endocrinology', name: 'Paediatric Endocrinology', doctors: [
      { name: "Dr. Sayan Banerjee", qualification: "MD, DM (PAEDIATRIC ENDOCRINOLOGY)", schedule: [{ day: 'Sun', time: "09:00 - 16:00" }] },
    ] },
    { id: 'physiatry', name: 'Physiatry', doctors: [
      { name: "Dr. D.Bhakat", qualification: "MBBS, MD (P.M.& R.)", schedule: [{ day: 'Tue', time: "14:30 - 17:00" }, { day: 'Thu', time: "12:00 - 15:00" }, { day: 'Sun', time: "12:00 - 15:00" }] },
      { name: "Dr. Swapan Kumar Misra", qualification: "MBBS, DNB (P.M.&R.)", schedule: [{ day: 'Fri', time: "09:00 - 17:00" }, { day: 'Sun', time: "09:00 - 17:00" }] },
    ] },
    { id: 'physician-and-critical-care', name: 'Physician & Critical Care', doctors: [
      { name: "Dr. Tapas Chakrabarti", qualification: "MBBS, MD (ANAESTHESIOLOGY )", schedule: [{ day: 'Mon', time: "10:00 - 11:00" }, { day: 'Tue', time: "10:00 - 11:00" }, { day: 'Wed', time: "10:00 - 11:00" }, { day: 'Thu', time: "10:00 - 11:00" }, { day: 'Fri', time: "10:00 - 11:00" }, { day: 'Sat', time: "10:00 - 11:00" }] },
    ] },
    { id: 'psychiatry', name: 'Psychiatry', doctors: [
      { name: "Dr. Abhishek Dandapath", qualification: "MBBS, MD (PSYCHIATRY)", schedule: [{ day: 'Tue', time: "09:00 - 13:00" }, { day: 'Wed', time: "09:00 - 11:00" }] },
      { name: "Dr. Aritra Bandyopadhyay", qualification: "MBBS, MD (PSYCHIATRY)", schedule: [{ day: 'Thu', time: "10:00 - 13:00" }, { day: 'Fri', time: "10:00 - 13:00" }] },
      { name: "Dr. Asim Kumar Mallik", qualification: "MBBS, MD (PSYCHIATRY)", schedule: [{ day: 'Wed', time: "09:00 - 14:00" }] },
      { name: "Dr. Bhaskar Mukherjee", qualification: "MBBS, MD (PSYCHIATRY)", schedule: [{ day: 'Fri', time: "11:00 - 17:00" }] },
      { name: "Dr. Dipankar Kanji", qualification: "MBBS, MD (PSYCHIATRY)", schedule: [{ day: 'Mon', time: "10:00 - 17:00" }, { day: 'Tue', time: "10:00 - 14:00" }, { day: 'Sun', time: "10:00 - 17:00" }] },
      { name: "Dr. J.Ray Chaudhuri", qualification: "MBBS, MD (PSYCHOLOGICAL MEDICINE)", schedule: [{ day: 'Sun', time: "09:00 - 17:00" }] },
      { name: "Dr. Kamalika Mandal", qualification: "DPM, MD (PSYCHIATRY), MRCPSYCH.", schedule: [{ day: 'Wed', time: "09:30 - 12:30" }, { day: 'Sun', time: "09:30 - 12:30" }] },
      { name: "Dr. Kanika Das", qualification: "MBBS, MD (PSYCHIATRY)", schedule: [{ day: 'Sat', time: "09:00 - 13:00" }] },
      { name: "Dr. Md.Wahedur Rahman", qualification: "MBBS, MD (KOL)", schedule: [{ day: 'Mon', time: "09:00 - 13:00" }, { day: 'Sun', time: "09:00 - 13:00" }] },
      { name: "Dr. Nilanjan Chandra", qualification: "MBBS, MD (PSYCHIATRY)", schedule: [{ day: 'Mon', time: "09:00 - 13:00" }, { day: 'Tue', time: "09:00 - 13:00" }] },
      { name: "Dr. Purvita Sarkar Ray", qualification: "MBBS, MD (PSYCHIATRY)", schedule: [{ day: 'Fri', time: "09:00 - 16:00" }] },
      { name: "Dr. Rajesh Kumar Thakur", qualification: "MBBS, MD (PSYCHIATRY)", schedule: [{ day: 'Thu', time: "09:00 - 14:00" }] },
      { name: "Dr. Sk.Sayeed Hossain", qualification: "MBBS, MD (PSYCHIATRY)", schedule: [{ day: 'Wed', time: "09:00 - 13:00" }, { day: 'Sat', time: "09:00 - 13:00" }] },
      { name: "Dr. Sudipta Ghosh", qualification: "MBBS, MD (PSYCHIATRY)", schedule: [{ day: 'Sat', time: "10:00 - 13:00" }] },
      { name: "Dr. T.Naskar", qualification: "MBBS, MD (PSYCHIATRY)", schedule: [{ day: 'Sat', time: "10:00 - 13:00" }] },
    ] },
    { id: 'pulmonology', name: 'Pulmonology', doctors: [
      { name: "Dr. Shashank Kumar", qualification: "MD, DM (PULMONARY, CRITICAL CARE & SLEEP MEDICINE)", schedule: [{ day: 'Sat', time: "09:00 - 16:00" }, { day: 'Sun', time: "09:00 - 16:00" }] },
      { name: "Dr. Sumanta Jha", qualification: "MD, DM (PULMONARY MEDICINE & CRITICAL CARE MEDICINE)", schedule: [{ day: 'Mon', time: "09:00 - 16:00" }, { day: 'Sun', time: "09:00 - 16:00" }] },
    ] },
    { id: 'rheumatology', name: 'Rheumatology', doctors: [
      { name: "Dr. Angan Karmakar", qualification: "MD, DM (RHEUMATOLOGY)", schedule: [{ day: 'Sun', time: "09:00 - 17:00" }] },
      { name: "Dr. Debaditya Roy", qualification: "MD, DM (RHEUMATOLOGY)", schedule: [{ day: 'Sun', time: "09:00 - 16:00" }] },
      { name: "Dr. Debanjan Roy Chowdhury", qualification: "MD, DNB, DM (RHEUMATOLOGY)", schedule: [{ day: 'Sat', time: "09:00 - 16:00" }] },
      { name: "Dr. Koushik Mukherjee", qualification: "MD, DM (RHEUMATOLOGY)", schedule: [{ day: 'Sun', time: "09:00 - 16:00" }] },
    ] },
    { id: 'urology', name: 'Urology', doctors: [
      { name: "Dr. Barun Saha", qualification: "MS, MCH (UROLOGY)", schedule: [{ day: 'Sun', time: "09:00 - 17:00" }] },
      { name: "Dr. Chandranath Mukhopadhyay", qualification: "MS, MCH (UROLOGY)", schedule: [{ day: 'Sat', time: "09:00 - 17:00" }] },
      { name: "Dr. Debabrata Das", qualification: "MS, MCH (UROLOGY), DRNB (UROLOGY)", schedule: [{ day: 'Sat', time: "09:00 - 16:00" }] },
      { name: "Dr. Dipankar Bera", qualification: "MS, MCH (UROLOGY)", schedule: [{ day: 'Sat', time: "09:00 - 17:00" }] },
      { name: "Dr. Manas Sasmal", qualification: "MS, MCH (UROLOGY)", schedule: [{ day: 'Thu', time: "09:00 - 16:00" }] },
      { name: "Dr. Nilanjan Mitra", qualification: "MS, MCH (UROLOGY)", schedule: [{ day: 'Sat', time: "09:00 - 17:00" }, { day: 'Sun', time: "09:00 - 17:00" }] },
      { name: "Dr. Saptarshi Mukherjee", qualification: "MS, MCH (UROLOGY) MRCS", schedule: [{ day: 'Sun', time: "09:00 - 17:00" }] },
      { name: "Dr. Sumit Kumar", qualification: "MS, MCH (UROLOGY)", schedule: [{ day: 'Fri', time: "10:00 - 17:00" }, { day: 'Sat', time: "10:00 - 17:00" }, { day: 'Sun', time: "10:00 - 17:00" }] },
      { name: "Dr. Surajit Sasmal", qualification: "MS, MCH (UROLOGY)", schedule: [{ day: 'Sat', time: "09:00 - 17:00" }, { day: 'Sun', time: "09:00 - 17:00" }] },
      { name: "Dr. Susanta Kumar Das", qualification: "MS, MCH (UROLOGY)", schedule: [{ day: 'Sat', time: "09:00 - 17:00" }] },
      { name: "Dr. Tamaghna Pal", qualification: "MS, DNB, MCH, DRNB", schedule: [{ day: 'Tue', time: "09:00 - 16:00" }, { day: 'Wed', time: "09:00 - 16:00" }, { day: 'Thu', time: "09:00 - 16:00" }, { day: 'Sun', time: "09:00 - 16:00" }] },
      { name: "Dr. Vishal Jalan", qualification: "MS, MCH (UROLOGY)", schedule: [{ day: 'Thu', time: "09:00 - 16:00" }] },
    ] },
  ],

  balurghat: [
    { id: 'cardiology', name: 'Cardiology', doctors: [
      { name: "Dr. Arindam Basu", qualification: "MD.DM.(CARDIO)", schedule: [{ day: 'Wed', time: "10:00 - 17:00" }, { day: 'Thu', time: "10:00 - 17:00" }, { day: 'Fri', time: "10:00 - 17:00" }, { day: 'Sat', time: "10:00 - 17:00" }, { day: 'Sun', time: "10:00 - 17:00" }] },
      { name: "Dr. Pramit Kumar Maji", qualification: "MBBS.,M.D,DM (CARDIOLOGY)", schedule: [{ day: 'Sat', time: "10:00 - 17:00" }, { day: 'Sun', time: "10:00 - 17:00" }] },
      { name: "Dr. Shuvadeep Sarkar", qualification: "MD.DM. (CARDIOLOGY)", schedule: [{ day: 'Mon', time: "10:00 - 17:00" }, { day: 'Tue', time: "10:00 - 17:00" }, { day: 'Sun', time: "10:00 - 17:00" }] },
      { name: "Dr. Soumik Ghosh", qualification: "MD.DM.(CARDIO)", schedule: [{ day: 'Mon', time: "12:00 - 14:30" }, { day: 'Tue', time: "12:00 - 14:30" }, { day: 'Wed', time: "12:00 - 14:30" }, { day: 'Fri', time: "12:00 - 14:30" }, { day: 'Sat', time: "12:00 - 14:30" }, { day: 'Sun', time: "12:00 - 14:30" }] },
    ] },
    { id: 'chest-medicine', name: 'Chest Medicine', doctors: [
      { name: "Dr. Priyanka Ghosh", qualification: "MD.DNB", schedule: [{ day: 'Mon', time: "09:00 - 17:00" }, { day: 'Fri', time: "09:00 - 12:00" }, { day: 'Sat', time: "09:00 - 12:00" }, { day: 'Sun', time: "09:00 - 12:00" }] },
      { name: "Dr. Sourav Mukherjee", qualification: "MBBS, MD (CHEST MEDICINE).", schedule: [{ day: 'Mon', time: "14:00 - 16:00" }, { day: 'Tue', time: "14:00 - 16:00" }, { day: 'Wed', time: "14:00 - 16:00" }, { day: 'Thu', time: "14:00 - 16:00" }, { day: 'Fri', time: "14:00 - 16:00" }, { day: 'Sun', time: "14:00 - 16:00" }] },
    ] },
    { id: 'dermatology', name: 'Dermatology', doctors: [
      { name: "Dr. Bidhan Mondal", qualification: "MBBS,MD(DVL)", schedule: [{ day: 'Mon', time: "15:00 - 18:00" }, { day: 'Fri', time: "15:00 - 18:00" }] },
      { name: "Dr. Suman Sen", qualification: "MBBS.MD. (DERMATOLOGY,VENEROLOGY & LEPROSY)", schedule: [{ day: 'Tue', time: "13:00 - 17:00" }] },
    ] },
    { id: 'e-n-t', name: 'E.n.t', doctors: [
      { name: "Dr. Kallol Pal", qualification: "M.B.B.S,D.L.O", schedule: [{ day: 'Sat', time: "09:30 - 13:30" }] },
      { name: "Dr. Kaoshar Ahmed", qualification: "MBBS.MS.(ENT)", schedule: [{ day: 'Sun', time: "15:30 - 17:00" }] },
    ] },
    { id: 'endocrinology', name: 'Endocrinology', doctors: [
      { name: "Dr. Silima Subhasnigdha Tarenia", qualification: "MD(GENL.MED.), DRNB, DM(ENDOCRINOLOGY)", schedule: [{ day: 'Fri', time: "10:00 - 17:00" }, { day: 'Sat', time: "10:00 - 17:00" }, { day: 'Sun', time: "10:00 - 17:00" }] },
      { name: "Dr. Soham Tarafdar", qualification: "M.D.,D.M.(ENDOCRINOLOGY)", schedule: [{ day: 'Tue', time: "10:00 - 17:00" }, { day: 'Wed', time: "10:00 - 17:00" }, { day: 'Sat', time: "10:00 - 17:00" }, { day: 'Sun', time: "10:00 - 17:00" }] },
    ] },
    { id: 'gastroenterology', name: 'Gastroenterology', doctors: [
      { name: "Dr. Biswajit Banik", qualification: "MD., DM.(GASTROENTEROLOGY)", schedule: [{ day: 'Thu', time: "12:00 - 17:00" }, { day: 'Fri', time: "12:00 - 17:00" }, { day: 'Sat', time: "12:00 - 17:00" }, { day: 'Sun', time: "12:00 - 17:00" }] },
      { name: "Dr. Chandan Kumar Das", qualification: "MD., DM.(GASTROENTEROLOGY)", schedule: [{ day: 'Mon', time: "14:00 - 17:00" }, { day: 'Tue', time: "14:00 - 17:00" }, { day: 'Thu', time: "14:00 - 17:00" }, { day: 'Fri', time: "14:00 - 17:00" }, { day: 'Sat', time: "14:00 - 17:00" }] },
    ] },
    { id: 'general-physician', name: 'General Physician', doctors: [
      { name: "Dr. Subrata Mondal", qualification: "M.B.B.S(CAL)..", schedule: [{ day: 'Mon', time: "08:00 - 09:30" }, { day: 'Mon', time: "16:30 - 18:00" }, { day: 'Tue', time: "08:00 - 09:30" }, { day: 'Tue', time: "16:30 - 18:00" }, { day: 'Wed', time: "08:00 - 09:30" }, { day: 'Wed', time: "16:30 - 18:00" }, { day: 'Thu', time: "08:00 - 09:30" }, { day: 'Thu', time: "16:30 - 18:00" }, { day: 'Fri', time: "08:00 - 09:30" }, { day: 'Fri', time: "16:30 - 18:00" }, { day: 'Sat', time: "08:00 - 09:30" }, { day: 'Sat', time: "16:30 - 18:00" }, { day: 'Sun', time: "08:00 - 09:30" }, { day: 'Sun', time: "16:30 - 18:00" }] },
    ] },
    { id: 'gynaecology', name: 'Gynaecology', doctors: [
      { name: "Dr. Kaushik Bhagat", qualification: "MBBS.,MS,(OBS & GYNAE)", schedule: [{ day: 'Mon', time: "10:00 - 13:00" }, { day: 'Tue', time: "10:00 - 19:00" }, { day: 'Wed', time: "10:00 - 13:00" }, { day: 'Thu', time: "10:00 - 13:00" }, { day: 'Fri', time: "10:00 - 13:00" }, { day: 'Sat', time: "10:00 - 13:00" }, { day: 'Sun', time: "10:00 - 13:00" }] },
      { name: "Dr. S.M.Badruddoza", qualification: "MBBS(WBUHS), MS(OBST. & GYNAE)", schedule: [{ day: 'Mon', time: "11:00 - 14:00" }, { day: 'Tue', time: "11:00 - 14:00" }, { day: 'Thu', time: "11:00 - 14:00" }, { day: 'Fri', time: "11:00 - 14:00" }, { day: 'Sat', time: "11:00 - 14:00" }] },
      { name: "Dr. Sangeeta Das", qualification: "MBBS.MS.G & O", schedule: [{ day: 'Mon', time: "16:00 - 17:00" }, { day: 'Tue', time: "16:00 - 17:00" }, { day: 'Wed', time: "16:00 - 17:00" }, { day: 'Thu', time: "16:00 - 17:00" }, { day: 'Fri', time: "16:00 - 17:00" }, { day: 'Sat', time: "16:00 - 17:00" }, { day: 'Sun', time: "16:00 - 17:00" }] },
      { name: "Dr. Saumen Chaudhuri", qualification: "DGO", schedule: [{ day: 'Mon', time: "11:00 - 13:00" }, { day: 'Tue', time: "11:00 - 13:00" }, { day: 'Wed', time: "11:00 - 13:00" }, { day: 'Thu', time: "11:00 - 13:00" }, { day: 'Fri', time: "11:00 - 13:00" }, { day: 'Sat', time: "11:00 - 13:00" }, { day: 'Sun', time: "11:00 - 13:00" }] },
    ] },
    { id: 'haematology', name: 'Haematology', doctors: [
      { name: "Dr. Sudip Roy", qualification: "DM(CLINICAL HAEMATOLOGY)", schedule: [{ day: 'Fri', time: "10:00 - 14:00" }] },
    ] },
    { id: 'lap-and-general-surgery', name: 'Lap. & general surgery', doctors: [
      { name: "Dr. Avijit Bakshi", qualification: "M.B.B.S.,D.O.,M.S.", schedule: [{ day: 'Mon', time: "10:00 - 12:00" }, { day: 'Tue', time: "10:00 - 12:00" }, { day: 'Wed', time: "10:00 - 12:00" }, { day: 'Thu', time: "10:00 - 12:00" }, { day: 'Fri', time: "10:00 - 12:00" }, { day: 'Sat', time: "10:00 - 12:00" }, { day: 'Sun', time: "10:00 - 12:00" }] },
      { name: "Dr. Debasish Biswas", qualification: "MS (GENERAL SURGERY)", schedule: [{ day: 'Mon', time: "11:00 - 12:30" }, { day: 'Tue', time: "11:00 - 12:30" }, { day: 'Wed', time: "11:00 - 12:30" }, { day: 'Thu', time: "11:00 - 12:30" }, { day: 'Fri', time: "11:00 - 12:30" }, { day: 'Sat', time: "11:00 - 12:30" }, { day: 'Sun', time: "11:00 - 12:30" }] },
    ] },
    { id: 'medicine', name: 'Medicine', doctors: [
      { name: "Dr. Arkadeb Maiti", qualification: "MBBS.MD.(MEDICINE)", schedule: [{ day: 'Mon', time: "10:00 - 11:00" }, { day: 'Tue', time: "10:00 - 11:00" }, { day: 'Tue', time: "10:00 - 11:00" }, { day: 'Wed', time: "10:00 - 11:00" }, { day: 'Thu', time: "10:00 - 11:00" }, { day: 'Fri', time: "10:00 - 11:00" }, { day: 'Sat', time: "10:00 - 11:00" }, { day: 'Sun', time: "10:00 - 11:00" }] },
      { name: "Dr. Niranjan Kar", qualification: "MD.(MEDICINE)", schedule: [{ day: 'Thu', time: "11:00 - 13:00" }, { day: 'Sun', time: "15:00 - 17:00" }] },
      { name: "Dr. Punnag Sarkar", qualification: "MBBS. MD", schedule: [{ day: 'Mon', time: "12:00 - 13:00" }, { day: 'Tue', time: "12:00 - 13:00" }, { day: 'Wed', time: "12:00 - 13:00" }, { day: 'Thu', time: "12:00 - 13:00" }, { day: 'Fri', time: "12:00 - 13:00" }, { day: 'Sat', time: "12:00 - 13:00" }, { day: 'Sun', time: "12:00 - 13:00" }] },
      { name: "Dr. Souresh Mondal", qualification: "MD (MEDICINE)", schedule: [{ day: 'Mon', time: "14:00 - 16:00" }, { day: 'Tue', time: "14:00 - 16:00" }, { day: 'Wed', time: "14:00 - 16:00" }, { day: 'Thu', time: "14:00 - 16:00" }, { day: 'Fri', time: "14:00 - 16:00" }, { day: 'Sat', time: "14:00 - 16:00" }, { day: 'Sun', time: "14:00 - 16:00" }] },
    ] },
    { id: 'nephrology', name: 'Nephrology', doctors: [
      { name: "Dr. Pinaki Mukhopadhyay", qualification: "MD, DM (NEPHRO)", schedule: [{ day: 'Mon', time: "10:00 - 17:00" }, { day: 'Tue', time: "10:00 - 17:00" }, { day: 'Fri', time: "10:00 - 17:00" }, { day: 'Sat', time: "10:00 - 17:00" }, { day: 'Sun', time: "10:00 - 17:00" }] },
      { name: "Dr. Prasun Roy", qualification: "M.D.(MEDICINE),D.M.(NEPHROLOGY)", schedule: [{ day: 'Fri', time: "10:00 - 17:00" }, { day: 'Sat', time: "10:00 - 17:00" }, { day: 'Sun', time: "10:00 - 17:00" }] },
      { name: "Dr. Puranjoy Chakrabarty", qualification: "MD.DM.(NEPHRO)", schedule: [{ day: 'Sat', time: "10:00 - 17:00" }, { day: 'Sun', time: "10:00 - 17:00" }] },
      { name: "Dr. Raj Narayan Mukherjee", qualification: "M.D.(MEDICINE),D.M.(NEPHROLOGY)", schedule: [{ day: 'Mon', time: "12:30 - 16:00" }, { day: 'Sat', time: "12:30 - 16:00" }] },
      { name: "Dr. Tathagata Mukherjee", qualification: "M.D.(MEDICINE),D.M.(NEPHROLOGY)", schedule: [{ day: 'Tue', time: "10:00 - 17:00" }, { day: 'Fri', time: "10:00 - 17:00" }, { day: 'Sun', time: "10:00 - 17:00" }] },
    ] },
    { id: 'neuro-surgery', name: 'Neuro Surgery', doctors: [
      { name: "Dr. Ujjwal Kumar Biswas", qualification: "MS,MCH.(NEUROSURGERY)", schedule: [{ day: 'Wed', time: "13:00 - 17:00" }] },
    ] },
    { id: 'neurology', name: 'Neurology', doctors: [
      { name: "Dr. Akash Manna", qualification: "MD.DM.(NEURO)", schedule: [{ day: 'Sun', time: "12:30 - 16:00" }] },
      { name: "Dr. Dilip Roy", qualification: "MD, DM (NEUROLOGY)", schedule: [{ day: 'Fri', time: "10:00 - 17:00" }, { day: 'Sun', time: "10:00 - 17:00" }] },
      { name: "Dr. Sougata Bhattacharya", qualification: "MD.,DM (NEUROLOGY)", schedule: [{ day: 'Tue', time: "10:00 - 17:00" }, { day: 'Wed', time: "10:00 - 17:00" }, { day: 'Thu', time: "10:00 - 17:00" }] },
    ] },
    { id: 'orthopadic', name: 'Orthopadic', doctors: [
      { name: "Dr. Aniruddha Dey", qualification: "M.S. (ORTHO)", schedule: [{ day: 'Mon', time: "08:30 - 09:30" }, { day: 'Tue', time: "08:30 - 09:30" }, { day: 'Wed', time: "08:30 - 09:30" }, { day: 'Thu', time: "08:30 - 09:30" }, { day: 'Fri', time: "08:30 - 09:30" }, { day: 'Sat', time: "08:30 - 09:30" }, { day: 'Sun', time: "08:30 - 09:30" }] },
      { name: "Dr. Prof.Prasanta Kumar Saha", qualification: "M.B.B.S.(CAL), M.S.(ORTHOPAEDICS)", schedule: [{ day: 'Fri', time: "09:30 - 13:00" }, { day: 'Sat', time: "09:30 - 13:00" }] },
    ] },
    { id: 'paediatric', name: 'Paediatric', doctors: [
      { name: "Dr. Kushal Karmakar", qualification: "MBBS, MD.", schedule: [{ day: 'Mon', time: "10:00 - 12:00" }, { day: 'Tue', time: "10:00 - 12:00" }, { day: 'Wed', time: "10:00 - 12:00" }, { day: 'Thu', time: "10:00 - 12:00" }, { day: 'Fri', time: "10:00 - 12:00" }, { day: 'Sat', time: "10:00 - 12:00" }, { day: 'Sun', time: "10:00 - 12:00" }] },
      { name: "Dr. S.N.Banerjee", qualification: "MD(PED)", schedule: [{ day: 'Mon', time: "16:30 - 18:00" }, { day: 'Tue', time: "16:30 - 18:00" }, { day: 'Wed', time: "16:30 - 18:00" }, { day: 'Thu', time: "16:30 - 18:00" }, { day: 'Fri', time: "16:30 - 18:00" }, { day: 'Sat', time: "16:30 - 18:00" }, { day: 'Sun', time: "16:30 - 18:00" }] },
    ] },
    { id: 'paediatric-cardiology', name: 'Paediatric Cardiology', doctors: [
      { name: "Dr. Shyamajit Samaddar", qualification: "MD., DM.(PEDIATRIC CARDIOLOGY)", schedule: [{ day: 'Sun', time: "10:00 - 17:00" }] },
    ] },
    { id: 'physiatry', name: 'Physiatry', doctors: [
      { name: "Dr. Debangshu Bhakat", qualification: "MBBS., MD(P.M & R), (CAL)", schedule: [{ day: 'Mon', time: "10:00 - 16:00" }, { day: 'Tue', time: "10:00 - 16:00" }, { day: 'Wed', time: "10:00 - 16:00" }, { day: 'Thu', time: "10:00 - 16:00" }, { day: 'Fri', time: "10:00 - 16:00" }, { day: 'Sat', time: "10:00 - 16:00" }, { day: 'Sun', time: "10:00 - 16:00" }] },
    ] },
    { id: 'psychiatry', name: 'Psychiatry', doctors: [
      { name: "Dr. Sk Sayeed Hossain", qualification: "MBBS, MD, (PSYCHIATRIST))", schedule: [{ day: 'Thu', time: "10:00 - 15:00" }, { day: 'Fri', time: "10:00 - 17:00" }] },
    ] },
    { id: 'rheumatology', name: 'Rheumatology', doctors: [
      { name: "Dr. Angan Karmakar", qualification: "MD (MEDICINE).DM(RHEUMATOLOGY)", schedule: [{ day: 'Mon', time: "10:00 - 16:00" }, { day: 'Wed', time: "10:00 - 16:00" }, { day: 'Sun', time: "10:00 - 16:00" }] },
    ] },
    { id: 'urology', name: 'Urology', doctors: [
      { name: "Dr. Chandranath Mukhopadhyay", qualification: "M.S.,M.CH. (UROLOGY)", schedule: [{ day: 'Sun', time: "10:00 - 14:00" }] },
      { name: "Dr. Debabrata Das", qualification: "MS,DRNB,M.CH(UROLOGY)", schedule: [{ day: 'Fri', time: "10:00 - 16:00" }, { day: 'Sun', time: "10:00 - 16:00" }] },
      { name: "Dr. Susanta Kumar Das", qualification: "M.S., M.CH.(UROLOGY)", schedule: [{ day: 'Fri', time: "10:00 - 12:00" }, { day: 'Sat', time: "10:00 - 12:00" }] },
    ] },
  ],

  gangarampur: [
    { id: 'cardiology', name: 'Cardiology', doctors: [
      { name: "Dr. Arindam Basu", qualification: "MD.DM.", schedule: [{ day: 'Tue', time: "08:00 - 14:00" }, { day: 'Fri', time: "10:00 - 16:00" }] },
      { name: "Dr. Shuvadeep Sarkar", qualification: "MD.DM.", schedule: [{ day: 'Sun', time: "09:00 - 04:00" }] },
      { name: "Dr. Sk Rafijuddin Ahamed", qualification: "MD(MED).DM(CARDIOLOGY)", schedule: [{ day: 'Sat', time: "09:00 - 17:00" }] },
      { name: "Dr. Soumik Ghosh", qualification: "MD.DM.", schedule: [{ day: 'Mon', time: "16:00 - 18:00" }, { day: 'Tue', time: "15:00 - 19:00" }, { day: 'Sat', time: "15:00 - 19:00" }] },
    ] },
    { id: 'chest-medicine', name: 'Chest Medicine', doctors: [
      { name: "Dr. Priyanka Ghosh", qualification: "MBBS.MD (PULMONARY MEDICINE), DNB (RESPIRATORY DIS.)", schedule: [{ day: 'Sat', time: "13:00 - 14:00" }] },
      { name: "Dr. Sourav Mozumder", qualification: "MBBS, MD (RESPIRATORY MEDICINE)", schedule: [{ day: 'Tue', time: "12:00 - 14:00" }, { day: 'Sun', time: "11:00 - 15:00" }] },
      { name: "Dr. Soyel Rana Mamtaj", qualification: "MBBS.MD.", schedule: [{ day: 'Fri', time: "11:00 - 14:00" }] },
    ] },
    { id: 'dermatology', name: 'Dermatology', doctors: [
      { name: "Dr. Pijushkanti Datta", qualification: "MBBS.MD.", schedule: [{ day: 'Mon', time: "15:00 - 16:00" }] },
      { name: "Dr. Rajdeep Saha", qualification: "MBBS.MD.", schedule: [{ day: 'Mon', time: "18:00 - 19:00" }, { day: 'Tue', time: "18:00 - 19:00" }, { day: 'Wed', time: "18:00 - 19:00" }] },
      { name: "Dr. Suman Sen", qualification: "MBBS.MD.", schedule: [{ day: 'Tue', time: "09:00 - 11:00" }, { day: 'Sat', time: "09:00 - 11:00" }] },
    ] },
    { id: 'ent-surgeon', name: 'ENT Surgeon', doctors: [
      { name: "Dr. Debalina Mazumdar", qualification: "MBBS.DNB.", schedule: [{ day: 'Tue', time: "09:00 - 16:00" }] },
      { name: "Dr. Kallol Pal", qualification: "MBBS,DLO", schedule: [{ day: 'Sat', time: "09:00 - 17:00" }] },
      { name: "Dr. Kaoshar Ahmed", qualification: "MS (ENT)", schedule: [{ day: 'Sun', time: "11:00 - 18:00" }] },
      { name: "Dr. Payal Pandey", qualification: "MBBS.MS.(ENT)", schedule: [{ day: 'Mon', time: "16:30 - 17:30" }, { day: 'Tue', time: "16:30 - 17:30" }, { day: 'Wed', time: "16:30 - 17:30" }, { day: 'Thu', time: "16:30 - 17:30" }, { day: 'Fri', time: "16:30 - 17:30" }, { day: 'Sat', time: "16:30 - 17:30" }, { day: 'Sun', time: "16:00 - 18:00" }] },
      { name: "Dr. Veeus Nag Mukherjee", qualification: "MBBS.MS.(ENT)", schedule: [{ day: 'Mon', time: "14:00 - 15:00" }, { day: 'Tue', time: "17:00 - 18:00" }] },
    ] },
    { id: 'endocrinology', name: 'Endocrinology', doctors: [
      { name: "Dr. Abhirup Banerjee", qualification: "MD.DM", schedule: [{ day: 'Wed', time: "15:00 - 19:00" }, { day: 'Fri', time: "15:00 - 19:00" }, { day: 'Sat', time: "16:00 - 19:00" }] },
      { name: "Dr. Silima S.Tarenia", qualification: "MD.DM", schedule: [{ day: 'Sat', time: "08:00 - 10:30" }] },
    ] },
    { id: 'gastroenterology', name: 'Gastroenterology', doctors: [
      { name: "Dr. Biswajit Banik", qualification: "MD.DM.", schedule: [{ day: 'Wed', time: "09:00 - 17:00" }, { day: 'Sun', time: "09:00 - 17:00" }] },
      { name: "Dr. Chandan Sharma", qualification: "MD.DM.", schedule: [{ day: 'Wed', time: "09:00 - 17:00" }, { day: 'Sat', time: "09:00 - 17:00" }, { day: 'Sun', time: "09:00 - 17:00" }] },
    ] },
    { id: 'general-surgery-and-laparoscopy', name: 'General surgery and laparoscopy', doctors: [
      { name: "Dr. Alamgir Hossain", qualification: "MBBS.MS.", schedule: [{ day: 'Wed', time: "12:00 - 14:00" }] },
      { name: "Dr. Chandra Nath Saha", qualification: "MBBS.MS.", schedule: [{ day: 'Mon', time: "11:00 - 12:00" }, { day: 'Tue', time: "11:00 - 12:00" }, { day: 'Wed', time: "11:00 - 12:00" }, { day: 'Thu', time: "09:00 - 17:00" }, { day: 'Fri', time: "12:00 - 14:00" }, { day: 'Sat', time: "17:00 - 18:00" }, { day: 'Sun', time: "11:00 - 13:00" }] },
      { name: "Dr. Debasish Biswas", qualification: "MBBS.MS.", schedule: [{ day: 'Thu', time: "14:00 - 15:00" }, { day: 'Fri', time: "15:00 - 17:00" }, { day: 'Sat', time: "15:00 - 17:00" }] },
    ] },
    { id: 'gynaecology', name: 'Gynaecology', doctors: [
      { name: "Dr. Indrajit Majumdar", qualification: "MBBS.MS", schedule: [{ day: 'Sun', time: "14:00 - 16:00" }] },
      { name: "Dr. Mahmud Hasan", qualification: "MBBS.DNB", schedule: [{ day: 'Mon', time: "10:30 - 12:00" }, { day: 'Tue', time: "11:00 - 17:00" }, { day: 'Thu', time: "10:30 - 12:00" }, { day: 'Fri', time: "10:30 - 12:00" }, { day: 'Sat', time: "11:00 - 17:00" }, { day: 'Sun', time: "11:00 - 17:00" }] },
      { name: "Dr. Priyanjit Das", qualification: "MBBS.MS", schedule: [{ day: 'Mon', time: "09:00 - 17:00" }, { day: 'Tue', time: "09:00 - 17:00" }, { day: 'Wed', time: "09:00 - 17:00" }, { day: 'Thu', time: "09:00 - 17:00" }, { day: 'Fri', time: "09:00 - 17:00" }, { day: 'Sat', time: "09:00 - 17:00" }, { day: 'Sun', time: "09:00 - 17:00" }] },
    ] },
    { id: 'haematology', name: 'Haematology', doctors: [
      { name: "Dr. Sudip Roy", qualification: "MD.DM(HAEMATOLOGY)", schedule: [{ day: 'Fri', time: "14:00 - 16:00" }] },
    ] },
    { id: 'general-surgeon', name: 'General Surgeon', doctors: [
      { name: "Dr. Gouranga Pramanik", qualification: "MBBS.MS.", schedule: [{ day: 'Mon', time: "14:00 - 15:00" }, { day: 'Tue', time: "09:00 - 10:00" }, { day: 'Wed', time: "14:00 - 15:00" }, { day: 'Thu', time: "14:00 - 15:00" }, { day: 'Fri', time: "09:00 - 14:00" }, { day: 'Sat', time: "09:00 - 14:00" }, { day: 'Sun', time: "10:00 - 11:00" }] },
    ] },
    { id: 'medicine', name: 'Medicine', doctors: [
      { name: "Dr. Amartya Kumar Misra", qualification: "MBBS.DIP.CARD. MD(TROPICAL MEDICINE)", schedule: [{ day: 'Mon', time: "09:00 - 17:00" }, { day: 'Tue', time: "09:00 - 17:00" }, { day: 'Sat', time: "09:00 - 17:00" }] },
      { name: "Dr. Anupam Chanda", qualification: "M.B.B.S., M.D.", schedule: [{ day: 'Mon', time: "10:00 - 16:00" }, { day: 'Tue', time: "10:00 - 16:00" }, { day: 'Wed', time: "10:00 - 16:00" }] },
      { name: "Dr. Arkadeb Maiti", qualification: "MBBS,DA,MD.", schedule: [{ day: 'Mon', time: "16:00 - 18:00" }, { day: 'Wed', time: "11:00 - 13:00" }, { day: 'Fri', time: "16:00 - 18:00" }, { day: 'Sat', time: "16:00 - 17:00" }, { day: 'Sun', time: "14:00 - 15:00" }] },
      { name: "Dr. Niranjan Kar", qualification: "M.B.B.S., M.D.(MEDICINE)", schedule: [{ day: 'Wed', time: "13:00 - 15:00" }] },
      { name: "Dr. S.Abdus Salam A.S.F", qualification: "MBBS,MD(MED)", schedule: [{ day: 'Mon', time: "17:00 - 18:00" }, { day: 'Tue', time: "17:00 - 18:00" }, { day: 'Wed', time: "09:00 - 10:30" }, { day: 'Thu', time: "10:00 - 17:00" }, { day: 'Sun', time: "11:00 - 12:00" }] },
      { name: "Dr. Shyamapada Singh", qualification: "MBBS. MD.(MEDICINE)", schedule: [{ day: 'Thu', time: "10:00 - 17:00" }] },
    ] },
    { id: 'nephrology', name: 'Nephrology', doctors: [
      { name: "Dr. Prasun Roy", qualification: "MD.DM", schedule: [{ day: 'Fri', time: "08:30 - 10:30" }] },
      { name: "Dr. Puranjoy Chakrabarty", qualification: "MD, DM (NEPHROLOGY)", schedule: [{ day: 'Sat', time: "09:00 - 17:00" }] },
      { name: "Dr. Raj Narayan Mukherjee", qualification: "MD.DM.", schedule: [{ day: 'Mon', time: "09:00 - 11:00" }, { day: 'Sat', time: "09:00 - 11:00" }] },
      { name: "Dr. Tathagata Mukherjee", qualification: "MD.DM.", schedule: [{ day: 'Tue', time: "17:00 - 19:00" }, { day: 'Fri', time: "09:00 - 17:00" }, { day: 'Sun', time: "16:00 - 19:00" }] },
    ] },
    { id: 'neuro-surgery', name: 'Neuro Surgery', doctors: [
      { name: "Dr. Ujjwal Kumar Biswas", qualification: "MS.MCH.", schedule: [{ day: 'Wed', time: "09:00 - 11:00" }] },
    ] },
    { id: 'neurology', name: 'Neurology', doctors: [
      { name: "Dr. Akash Manna", qualification: "MD.DM.", schedule: [{ day: 'Sun', time: "09:00 - 13:00" }] },
      { name: "Dr. Dilip Roy", qualification: "MD.DM", schedule: [{ day: 'Mon', time: "09:00 - 16:00" }, { day: 'Sun', time: "09:00 - 16:00" }] },
      { name: "Dr. Sougata Bhattacharya", qualification: "MD. DM.", schedule: [{ day: 'Thu', time: "08:30 - 10:30" }] },
    ] },
    { id: 'ophthalmology', name: 'Ophthalmology', doctors: [
      { name: "Dr. Arnab Mukherjee", qualification: "MBBS.MS.(OPHTHALMOLOGY)", schedule: [{ day: 'Sat', time: "11:00 - 17:00" }, { day: 'Sun', time: "11:00 - 17:00" }] },
      { name: "Dr. Mrinmoy Roy", qualification: "MBBS.MS.(OPHTHALMOLOGY)", schedule: [{ day: 'Mon', time: "11:00 - 17:00" }] },
      { name: "Dr. Santanu De", qualification: "MBBS.MS.(OPHTHALMOLOGY)", schedule: [{ day: 'Tue', time: "10:00 - 14:00" }, { day: 'Fri', time: "10:00 - 14:00" }] },
    ] },
    { id: 'orthopaedic', name: 'Orthopaedic', doctors: [
      { name: "Dr. H.Linkon A.M.Alam", qualification: "M.B.B.S., M.S, (ORTHOPAEDICS)", schedule: [{ day: 'Mon', time: "15:00 - 17:00" }, { day: 'Tue', time: "16:00 - 17:00" }, { day: 'Wed', time: "15:00 - 17:00" }, { day: 'Thu', time: "15:00 - 17:00" }, { day: 'Fri', time: "15:00 - 17:00" }, { day: 'Sat', time: "15:00 - 17:00" }] },
      { name: "Dr. Sanjay Saha", qualification: "MBBS.MS.", schedule: [{ day: 'Mon', time: "15:00 - 17:00" }, { day: 'Tue', time: "11:00 - 16:00" }, { day: 'Wed', time: "09:00 - 16:00" }, { day: 'Fri', time: "09:00 - 16:00" }, { day: 'Sat', time: "09:00 - 16:00" }, { day: 'Sun', time: "12:00 - 14:00" }] },
    ] },
    { id: 'paediatric', name: 'Paediatric', doctors: [
      { name: "Dr. Imdadul Hoque", qualification: "MBBS.MD.", schedule: [{ day: 'Fri', time: "16:30 - 17:30" }, { day: 'Sat', time: "16:30 - 17:30" }, { day: 'Sun', time: "16:30 - 17:30" }] },
      { name: "Dr. Swarup Daptari", qualification: "M.B.B.S., M.D.(PAEDIATRICS)", schedule: [{ day: 'Mon', time: "11:30 - 14:00" }, { day: 'Tue', time: "11:30 - 14:00" }, { day: 'Wed', time: "11:30 - 14:00" }, { day: 'Thu', time: "11:30 - 14:00" }, { day: 'Fri', time: "11:30 - 14:00" }, { day: 'Sat', time: "11:30 - 14:00" }, { day: 'Sun', time: "10:30 - 13:00" }] },
      { name: "Dr. Tabasume Khatun", qualification: "MBBS.MD.(PAEDIATRICS)", schedule: [{ day: 'Mon', time: "10:00 - 17:00" }, { day: 'Tue', time: "10:00 - 17:00" }, { day: 'Wed', time: "10:00 - 17:00" }, { day: 'Thu', time: "10:00 - 17:00" }, { day: 'Fri', time: "10:00 - 17:00" }] },
    ] },
    { id: 'paediatric-cardiology', name: 'Paediatric Cardiology', doctors: [
      { name: "Dr. Shyamajit Samaddar", qualification: "MD (PAEDIATRICS), DM (PAEDIATRIC CARDIOLOGY)", schedule: [{ day: 'Sun', time: "09:00 - 17:00" }] },
    ] },
    { id: 'physical-medicine-and-rehab', name: 'Physical medicine & rehab', doctors: [
      { name: "Dr. Debangshu Bhakat", qualification: "MBBS,MD(PMR)", schedule: [{ day: 'Mon', time: "10:00 - 12:00" }, { day: 'Wed', time: "10:00 - 12:00" }, { day: 'Sat', time: "10:00 - 12:00" }] },
    ] },
    { id: 'psychiatry', name: 'Psychiatry', doctors: [
      { name: "Dr. Dipankar Kanji", qualification: "MBBS.MD.", schedule: [{ day: 'Sat', time: "15:00 - 17:00" }] },
      { name: "Dr. Pritam Datta", qualification: "MBBS.MD(PSYCHIATRY)", schedule: [{ day: 'Thu', time: "11:00 - 17:00" }, { day: 'Fri', time: "11:00 - 17:00" }, { day: 'Sat', time: "11:00 - 17:00" }] },
      { name: "Dr. Rajesh Kumar Thakur", qualification: "MBBS.MD", schedule: [{ day: 'Tue', time: "16:00 - 19:00" }, { day: 'Thu', time: "17:00 - 19:00" }, { day: 'Fri', time: "16:00 - 19:00" }, { day: 'Sat', time: "05:00 - 19:00" }] },
      { name: "Dr. Sk Sayeed Hossain", qualification: "MBBS.MD", schedule: [{ day: 'Thu', time: "15:00 - 17:00" }] },
    ] },
    { id: 'rheumatology', name: 'Rheumatology', doctors: [
      { name: "Dr. Angan Karmakar", qualification: "MD.DM.", schedule: [{ day: 'Wed', time: "08:30 - 10:30" }] },
    ] },
    { id: 'urology', name: 'Urology', doctors: [
      { name: "Dr. Chandranath Mukhopadhyay", qualification: "MS.MCH", schedule: [{ day: 'Sun', time: "08:30 - 10:30" }] },
      { name: "Dr. Debabrata Das", qualification: "MS.,M.CH.", schedule: [{ day: 'Fri', time: "09:00 - 12:00" }, { day: 'Sun', time: "09:00 - 05:00" }] },
    ] },
  ],
}

// Flat list of OPD doctors for the appointment-booking flow.
// Doctors appearing in multiple branches are merged by name, with
// per-branch consultation windows in branchSchedule.
export const opdAppointmentDoctors: OpdAppointmentDoctor[] = (() => {
  const byName = new Map<string, OpdAppointmentDoctor>()
  for (const [branchId, deptGroups] of Object.entries(outdoorDoctorGroups)) {
    for (const group of deptGroups) {
      for (const doc of group.doctors) {
        const existing = byName.get(doc.name)
        if (existing) {
          if (!existing.branchIds.includes(branchId)) existing.branchIds.push(branchId)
          if (!existing.branchSchedule.some(s => s.branchId === branchId)) {
            existing.branchSchedule.push({ branchId, slots: doc.schedule })
          }
        } else {
          byName.set(doc.name, {
            name: doc.name,
            specialty: group.name,
            qualification: doc.qualification,
            initials: initialsOf(doc.name),
            branchIds: [branchId],
            branchSchedule: [{ branchId, slots: doc.schedule }],
          })
        }
      }
    }
  }
  return [...byName.values()]
})()

// Branch → canonical department names present at that branch
// (used by the /departments availability matrix).
export const opdDepartmentsByBranch: Record<string, string[]> = Object.fromEntries(
  Object.entries(outdoorDoctorGroups).map(([branchId, depts]) => [
    branchId,
    depts.map(g => g.name),
  ]),
)
