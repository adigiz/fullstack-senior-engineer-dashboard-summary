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
  export class Diagnosis {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    diagnosis: string;
  
    @Column()
    date: Date;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date;
  
    @ManyToOne(() => Patient, (patient) => patient.diagnoses, { onDelete: "CASCADE" })
    patient: Patient;
  }
  