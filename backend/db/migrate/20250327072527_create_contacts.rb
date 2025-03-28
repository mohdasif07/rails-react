class CreateContacts < ActiveRecord::Migration[8.0]
  def change
    create_table :contacts do |t|
      t.string :name
      t.integer :phone
      t.text :description
      t.string :email
      t.timestamps
    end
  end
end
