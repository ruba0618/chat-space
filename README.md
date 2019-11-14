＃README

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :groups
- belongs_to :users

## users_table
|Column|Type|Options index: true|
|------|-----|------|
|name|string|null: false|
### Association
- belongs_to :groups 
- has_many:messages,through: :users_groups


## messages_table
|message_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- has_many :users_groups
- has_many :messages, through: users_groups

