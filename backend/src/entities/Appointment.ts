import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
  } from "typeorm";
  import { Patient } from "./Patient";
  
  @Entity()
  export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    date: Date;
  
    @Column()
    time: string;
  
    @Column()
    room: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date;
  
    @ManyToOne(() => Patient, (patient) => patient.appointments, { onDelete: "CASCADE" })
    patient: Patient;
  }
  