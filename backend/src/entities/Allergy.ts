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
  export class Allergy {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    allergy: string;
  
    @Column({ nullable: true })
    severity: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date;
  
    @ManyToOne(() => Patient, (patient) => patient.allergies, { onDelete: "CASCADE" })
    patient: Patient;
  }
  