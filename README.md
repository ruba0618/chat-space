＃README

## users table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|
|email|string|null: false|

## Association
- has_many :message
- has_many :groups, through: :members
- has_many :groups_users

##  groups table
|Column|Type|Options|
|------|----|-------|
|name|string|null: false,foreign_key: true|

##Association
has_many :users, through: :groups_users
has_many :messages
has_many :groups_users
 
## message table
|Column|Type|Options|
|------|----|-------|
|text|text|null: false,foreign_key: true|
|image|string||
|user_id|integer|null: false,foreign_key: true|
|group_id|integer|null: false,foreign_key: true|

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user