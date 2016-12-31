class CreateConversions < ActiveRecord::Migration[5.0]
  def change
    enable_extension 'uuid-ossp'

    create_table :conversions, id: :uuid do |t|
      t.string :audio_url
      t.string :image_url
      t.string :email

      t.timestamps
    end
  end
end
