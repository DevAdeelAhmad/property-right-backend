import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatePropertiesTable1712840000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // First, check if the table exists
    const tableExists = await queryRunner.hasTable('properties');
    
    if (tableExists) {
      // Update any null property_name values to a default value
      await queryRunner.query(`
        UPDATE properties 
        SET property_name = 'Unnamed Property' 
        WHERE property_name IS NULL
      `);
      
      // Now add the not null constraint
      await queryRunner.query(`
        ALTER TABLE properties 
        ALTER COLUMN property_name SET NOT NULL
      `);
    } else {
      // Create the table if it doesn't exist
      await queryRunner.query(`
        CREATE TABLE properties (
          id SERIAL PRIMARY KEY,
          property_name VARCHAR NOT NULL,
          created_at TIMESTAMPTZ DEFAULT NOW()
        )
      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // In the down migration, we make the column nullable again
    const tableExists = await queryRunner.hasTable('properties');
    
    if (tableExists) {
      await queryRunner.query(`
        ALTER TABLE properties 
        ALTER COLUMN property_name DROP NOT NULL
      `);
    }
  }
} 