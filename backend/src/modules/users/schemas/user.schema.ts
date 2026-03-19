import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true, collection: 'users' })
export class User {
  // ── Core identity ──────────────────────────────────────────────────────────
  @Prop({ required: true, trim: true })
  firstName: string;

  @Prop({ required: true, trim: true })
  lastName: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ enum: ['learner', 'trainer', 'iqa', 'admin'], required: true })
  role: string;

  @Prop({ default: null })
  avatar: string;

  @Prop({ default: null, select: false })
  refreshToken: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: null })
  lastLoginAt: Date;

  // ── Contact details ────────────────────────────────────────────────────────
  @Prop({ default: null })
  phone: string;

  @Prop({ default: null })
  landline: string;

  @Prop({ default: null })
  mobile: string;

  @Prop({ default: null })
  skype: string;

  @Prop({ default: null })
  website: string;

  // ── Personal details ───────────────────────────────────────────────────────
  @Prop({ default: null })
  pronouns: string;

  @Prop({ default: null })
  bio: string;

  // ── Address ────────────────────────────────────────────────────────────────
  @Prop({ default: null })
  address: string;

  @Prop({ default: null })
  homeAddress: string;

  @Prop({ default: null })
  workAddress: string;

  @Prop({ default: null })
  workplace: string;

  @Prop({ default: null })
  timezone: string;

  // ── Equality, LLDD & Health ────────────────────────────────────────────────
  @Prop({ default: null })
  ethnicity: string;

  @Prop({ default: null })
  sex: string;

  @Prop({ default: null })
  llddStatus: string;

  @Prop({ default: null })
  primaryLldd: string;

  // ── Attachments (CV, certificates, etc.) ──────────────────────────────────
  @Prop({ type: [{ name: String, url: String, uploadedAt: Date }], default: [] })
  attachments: { name: string; url: string; uploadedAt: Date }[];
}

export const UserSchema = SchemaFactory.createForClass(User);

// Virtual: full name
UserSchema.virtual('fullName').get(function (this: UserDocument) {
  return `${this.firstName} ${this.lastName}`;
});
