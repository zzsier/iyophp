<?php 
namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use MyRedis;
use Log;
use DB;
use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Illuminate\Log\Writer;
use Illuminate\Database\Eloquent\SoftDeletes;

class IyoServer extends Model {

	public static $servers = array(
		array(
			array("id"=>"1", "name"=>"艾欧尼亚 电信"),
			array("id"=>"2", "name"=>"比尔吉沃特 网通"),
		),
		//魔兽世界
		array(
			array("id"=>"1", "name"=>"万色星辰"),
			array("id"=>"2", "name"=>"世界之树"),
			array("id"=>"3", "name"=>"丹莫德"),
			array("id"=>"4", "name"=>"主宰之剑"),
			array("id"=>"5", "name"=>"丽丽"),
			array("id"=>"6", "name"=>"亚雷戈斯"),
			array("id"=>"7", "name"=>"亡语者"),
			array("id"=>"8", "name"=>"伊兰尼库斯"),
			array("id"=>"9", "name"=>"伊利丹"),
			array("id"=>"10", "name"=>"伊森利恩"),
			array("id"=>"11", "name"=>"伊森德雷"),
			array("id"=>"12", "name"=>"伊瑟拉"),
			array("id"=>"13", "name"=>"伊莫塔尔"),
			array("id"=>"14", "name"=>"伊萨里奥斯"),
			array("id"=>"15", "name"=>"元素之力"),
			array("id"=>"16", "name"=>"克尔苏加德"),
			array("id"=>"17", "name"=>"克洛玛古斯"),
			array("id"=>"18", "name"=>"克苏恩"),
			array("id"=>"19", "name"=>"军团要塞"),
			array("id"=>"20", "name"=>"冬拥湖"),
			array("id"=>"21", "name"=>"冬泉谷"),
			array("id"=>"22", "name"=>"冰川之拳"),
			array("id"=>"23", "name"=>"冰霜之刃"),
			array("id"=>"24", "name"=>"冰风岗"),
			array("id"=>"25", "name"=>"凤凰之神"),
			array("id"=>"26", "name"=>"凯尔萨斯"),
			array("id"=>"27", "name"=>"凯恩血蹄"),
			array("id"=>"28", "name"=>"利刃之拳"),
			array("id"=>"29", "name"=>"刺骨利刃"),
			array("id"=>"30", "name"=>"加兹鲁维"),
			array("id"=>"31", "name"=>"加基森"),
			array("id"=>"32", "name"=>"加尔"),
			array("id"=>"33", "name"=>"加里索斯"),
			array("id"=>"34", "name"=>"勇士岛"),
			array("id"=>"35", "name"=>"千针石林"),
			array("id"=>"36", "name"=>"卡德加"),
			array("id"=>"37", "name"=>"卡德罗斯"),
			array("id"=>"38", "name"=>"卡扎克"),
			array("id"=>"39", "name"=>"卡拉赞"),
			array("id"=>"40", "name"=>"卡珊德拉"),
			array("id"=>"41", "name"=>"厄祖玛特"),
			array("id"=>"42", "name"=>"古加尔"),
			array("id"=>"43", "name"=>"古尔丹"),
			array("id"=>"44", "name"=>"古拉巴什"),
			array("id"=>"45", "name"=>"古达克"),
			array("id"=>"46", "name"=>"哈兰"),
			array("id"=>"47", "name"=>"哈卡"),
			array("id"=>"48", "name"=>"嚎风峡湾"),
			array("id"=>"49", "name"=>"回音山"),
			array("id"=>"50", "name"=>"国王之谷"),
			array("id"=>"51", "name"=>"图拉扬"),
			array("id"=>"52", "name"=>"圣火神殿"),
			array("id"=>"53", "name"=>"地狱之石"),
			array("id"=>"54", "name"=>"地狱咆哮"),
			array("id"=>"55", "name"=>"埃克索图斯"),
			array("id"=>"56", "name"=>"埃加洛尔"),
			array("id"=>"57", "name"=>"埃基尔松"),
			array("id"=>"58", "name"=>"埃德萨拉"),
			array("id"=>"59", "name"=>"埃苏雷格"),
			array("id"=>"60", "name"=>"埃雷达尔"),
			array("id"=>"61", "name"=>"基尔加丹"),
			array("id"=>"62", "name"=>"基尔罗格"),
			array("id"=>"63", "name"=>"塔纳利斯"),
			array("id"=>"64", "name"=>"塞拉摩"),
			array("id"=>"65", "name"=>"塞拉赞恩"),
			array("id"=>"66", "name"=>"塞泰克"),
			array("id"=>"67", "name"=>"塞纳里奥"),
			array("id"=>"68", "name"=>"壁炉谷"),
			array("id"=>"69", "name"=>"夏维安"),
			array("id"=>"70", "name"=>"外域"),
			array("id"=>"71", "name"=>"大地之怒"),
			array("id"=>"72", "name"=>"大漩涡"),
			array("id"=>"73", "name"=>"天空之墙"),
			array("id"=>"74", "name"=>"天谴之门"),
			array("id"=>"75", "name"=>"太阳之井"),
			array("id"=>"76", "name"=>"夺灵者"),
			array("id"=>"77", "name"=>"奈法利安"),
			array("id"=>"78", "name"=>"奈萨里奥"),
			array("id"=>"79", "name"=>"奎尔丹纳斯"),
			array("id"=>"80", "name"=>"奎尔萨拉斯"),
			array("id"=>"81", "name"=>"奥妮克希亚"),
			array("id"=>"82", "name"=>"奥尔加隆"),
			array("id"=>"83", "name"=>"奥拉基尔"),
			array("id"=>"84", "name"=>"奥斯里安"),
			array("id"=>"85", "name"=>"奥杜尔"),
			array("id"=>"86", "name"=>"奥特兰克"),
			array("id"=>"87", "name"=>"奥蕾莉亚"),
			array("id"=>"88", "name"=>"奥达曼"),
			array("id"=>"89", "name"=>"守护之剑"),
			array("id"=>"90", "name"=>"安东尼达斯"),
			array("id"=>"91", "name"=>"安其拉"),
			array("id"=>"92", "name"=>"安加萨"),
			array("id"=>"93", "name"=>"安威玛尔"),
			array("id"=>"94", "name"=>"安戈洛"),
			array("id"=>"95", "name"=>"安格博达"),
			array("id"=>"96", "name"=>"安纳塞隆"),
			array("id"=>"97", "name"=>"安苏"),
			array("id"=>"98", "name"=>"密林游侠"),
			array("id"=>"99", "name"=>"寒冰皇冠"),
			array("id"=>"100", "name"=>"尘风峡谷"),
			array("id"=>"101", "name"=>"屠魔山谷"),
			array("id"=>"102", "name"=>"山丘之王"),
			array("id"=>"103", "name"=>"巨龙之吼"),
			array("id"=>"104", "name"=>"巫妖之王"),
			array("id"=>"105", "name"=>"巴尔古恩"),
			array("id"=>"106", "name"=>"巴瑟拉斯"),
			array("id"=>"107", "name"=>"巴纳扎尔"),
			array("id"=>"108", "name"=>"布兰卡德"),
			array("id"=>"109", "name"=>"布莱克摩"),
			array("id"=>"110", "name"=>"布莱恩"),
			array("id"=>"111", "name"=>"布鲁塔卢斯"),
			array("id"=>"112", "name"=>"希尔瓦娜斯"),
			array("id"=>"113", "name"=>"希雷诺斯"),
			array("id"=>"114", "name"=>"幽暗沼泽"),
			array("id"=>"115", "name"=>"库尔提拉斯"),
			array("id"=>"116", "name"=>"库德兰"),
			array("id"=>"117", "name"=>"弗塞雷迦"),
			array("id"=>"118", "name"=>"影之哀伤"),
			array("id"=>"119", "name"=>"影牙要塞"),
			array("id"=>"120", "name"=>"德拉诺"),
			array("id"=>"121", "name"=>"恐怖图腾"),
			array("id"=>"122", "name"=>"恶魔之翼"),
			array("id"=>"123", "name"=>"恶魔之魂"),
			array("id"=>"124", "name"=>"戈古纳斯"),
			array("id"=>"125", "name"=>"戈提克"),
			array("id"=>"126", "name"=>"战歌"),
			array("id"=>"127", "name"=>"扎拉赞恩"),
			array("id"=>"128", "name"=>"托塞德林"),
			array("id"=>"129", "name"=>"托尔巴拉德"),
			array("id"=>"130", "name"=>"拉文凯斯"),
			array("id"=>"131", "name"=>"拉文霍德"),
			array("id"=>"132", "name"=>"拉格纳洛斯"),
			array("id"=>"133", "name"=>"拉贾克斯"),
			array("id"=>"134", "name"=>"提尔之手"),
			array("id"=>"135", "name"=>"提瑞斯法"),
			array("id"=>"136", "name"=>"摩摩尔"),
			array("id"=>"137", "name"=>"斩魔者"),
			array("id"=>"138", "name"=>"斯坦索姆"),
			array("id"=>"139", "name"=>"无尽之海"),
			array("id"=>"140", "name"=>"无底海渊"),
			array("id"=>"141", "name"=>"日落沼泽"),
			array("id"=>"142", "name"=>"时光之穴"),
			array("id"=>"143", "name"=>"普瑞斯托"),
			array("id"=>"144", "name"=>"普罗德摩"),
			array("id"=>"145", "name"=>"晴日峰"),
			array("id"=>"146", "name"=>"暗影之月"),
			array("id"=>"147", "name"=>"暗影裂口"),
			array("id"=>"148", "name"=>"暗影议会"),
			array("id"=>"149", "name"=>"暗影迷宫"),
			array("id"=>"150", "name"=>"暮色森林"),
			array("id"=>"151", "name"=>"暴风祭坛"),
			array("id"=>"152", "name"=>"月光林地"),
			array("id"=>"153", "name"=>"月神殿"),
			array("id"=>"154", "name"=>"末日祷告祭坛"),
			array("id"=>"155", "name"=>"末日行者"),
			array("id"=>"156", "name"=>"朵丹尼尔"),
			array("id"=>"157", "name"=>"杜隆坦"),
			array("id"=>"158", "name"=>"格瑞姆巴托"),
			array("id"=>"159", "name"=>"格雷迈恩"),
			array("id"=>"160", "name"=>"格鲁尔"),
			array("id"=>"161", "name"=>"桑德兰"),
			array("id"=>"162", "name"=>"梅尔加尼"),
			array("id"=>"163", "name"=>"梦境之树"),
			array("id"=>"164", "name"=>"森金"),
			array("id"=>"165", "name"=>"死亡之翼"),
			array("id"=>"166", "name"=>"死亡熔炉"),
			array("id"=>"167", "name"=>"毁灭之锤"),
			array("id"=>"168", "name"=>"永夜港"),
			array("id"=>"169", "name"=>"永恒之井"),
			array("id"=>"170", "name"=>"沃金"),
			array("id"=>"171", "name"=>"沙怒"),
			array("id"=>"172", "name"=>"法拉希姆"),
			array("id"=>"173", "name"=>"泰兰德"),
			array("id"=>"174", "name"=>"泰拉尔"),
			array("id"=>"175", "name"=>"洛丹伦"),
			array("id"=>"176", "name"=>"洛肯"),
			array("id"=>"177", "name"=>"洛萨"),
			array("id"=>"178", "name"=>"海克泰尔"),
			array("id"=>"179", "name"=>"海加尔"),
			array("id"=>"180", "name"=>"海达希亚"),
			array("id"=>"181", "name"=>"深渊之喉"),
			array("id"=>"182", "name"=>"深渊之巢"),
			array("id"=>"183", "name"=>"激流之傲"),
			array("id"=>"184", "name"=>"激流堡"),
			array("id"=>"185", "name"=>"火喉"),
			array("id"=>"186", "name"=>"火烟之谷"),
			array("id"=>"187", "name"=>"火焰之树"),
			array("id"=>"188", "name"=>"火羽山"),
			array("id"=>"189", "name"=>"灰谷"),
			array("id"=>"190", "name"=>"烈焰峰"),
			array("id"=>"191", "name"=>"烈焰荆棘"),
			array("id"=>"192", "name"=>"熊猫酒仙"),
			array("id"=>"193", "name"=>"熔火之心"),
			array("id"=>"194", "name"=>"熵魔"),
			array("id"=>"195", "name"=>"燃烧之刃"),
			array("id"=>"196", "name"=>"燃烧军团"),
			array("id"=>"197", "name"=>"燃烧平原"),
			array("id"=>"198", "name"=>"爱斯特纳"),
			array("id"=>"199", "name"=>"狂热之刃"),
			array("id"=>"200", "name"=>"狂风峭壁"),
			array("id"=>"201", "name"=>"玛多兰"),
			array("id"=>"202", "name"=>"玛法里奥"),
			array("id"=>"203", "name"=>"玛洛加尔"),
			array("id"=>"204", "name"=>"玛瑟里顿"),
			array("id"=>"205", "name"=>"玛诺洛斯"),
			array("id"=>"206", "name"=>"玛里苟斯"),
			array("id"=>"207", "name"=>"瑞文戴尔"),
			array("id"=>"208", "name"=>"瑟莱德丝"),
			array("id"=>"209", "name"=>"瓦丝琪"),
			array("id"=>"210", "name"=>"瓦拉斯塔兹"),
			array("id"=>"211", "name"=>"瓦拉纳"),
			array("id"=>"212", "name"=>"瓦里玛萨斯"),
			array("id"=>"213", "name"=>"甜水绿洲"),
			array("id"=>"214", "name"=>"生态船"),
			array("id"=>"215", "name"=>"白银之手"),
			array("id"=>"216", "name"=>"白骨荒野"),
			array("id"=>"217", "name"=>"盖斯"),
			array("id"=>"218", "name"=>"石爪峰"),
			array("id"=>"219", "name"=>"石锤"),
			array("id"=>"220", "name"=>"破碎岭"),
			array("id"=>"221", "name"=>"祖尔金"),
			array("id"=>"222", "name"=>"祖达克"),
			array("id"=>"223", "name"=>"祖阿曼"),
			array("id"=>"224", "name"=>"神圣之歌"),
			array("id"=>"225", "name"=>"穆戈尔"),
			array("id"=>"226", "name"=>"符文图腾"),
			array("id"=>"227", "name"=>"米奈希尔"),
			array("id"=>"228", "name"=>"索拉丁"),
			array("id"=>"229", "name"=>"索瑞森"),
			array("id"=>"230", "name"=>"红云台地"),
			array("id"=>"231", "name"=>"红龙军团"),
			array("id"=>"232", "name"=>"红龙女王"),
			array("id"=>"233", "name"=>"纳克萨玛斯"),
			array("id"=>"234", "name"=>"纳沙塔尔"),
			array("id"=>"235", "name"=>"织亡者"),
			array("id"=>"236", "name"=>"罗宁"),
			array("id"=>"237", "name"=>"羽月"),
			array("id"=>"238", "name"=>"翡翠梦境"),
			array("id"=>"239", "name"=>"耐奥祖"),
			array("id"=>"240", "name"=>"耐普图隆"),
			array("id"=>"241", "name"=>"耳语海岸"),
			array("id"=>"242", "name"=>"能源舰"),
			array("id"=>"243", "name"=>"自由之风"),
			array("id"=>"244", "name"=>"艾森娜"),
			array("id"=>"245", "name"=>"艾欧纳尔"),
			array("id"=>"246", "name"=>"艾维娜"),
			array("id"=>"247", "name"=>"艾苏恩"),
			array("id"=>"248", "name"=>"艾莫莉丝"),
			array("id"=>"249", "name"=>"艾萨拉"),
			array("id"=>"250", "name"=>"艾露恩"),
			array("id"=>"251", "name"=>"芬里斯"),
			array("id"=>"252", "name"=>"苏塔恩"),
			array("id"=>"253", "name"=>"范克里夫"),
			array("id"=>"254", "name"=>"范达尔鹿盔"),
			array("id"=>"255", "name"=>"荆棘谷"),
			array("id"=>"256", "name"=>"莱索恩"),
			array("id"=>"257", "name"=>"菲拉斯"),
			array("id"=>"258", "name"=>"菲米丝"),
			array("id"=>"259", "name"=>"萨尔"),
			array("id"=>"260", "name"=>"萨格拉斯"),
			array("id"=>"261", "name"=>"萨洛拉丝"),
			array("id"=>"262", "name"=>"萨菲隆"),
			array("id"=>"263", "name"=>"蓝龙军团"),
			array("id"=>"264", "name"=>"藏宝海湾"),
			array("id"=>"265", "name"=>"蜘蛛王国"),
			array("id"=>"266", "name"=>"血吼"),
			array("id"=>"267", "name"=>"血牙魔王"),
			array("id"=>"268", "name"=>"血环"),
			array("id"=>"269", "name"=>"血羽"),
			array("id"=>"270", "name"=>"血色十字军"),
			array("id"=>"271", "name"=>"血顶"),
			array("id"=>"272", "name"=>"试炼之环"),
			array("id"=>"273", "name"=>"诺兹多姆"),
			array("id"=>"274", "name"=>"诺森德"),
			array("id"=>"275", "name"=>"诺莫瑞根"),
			array("id"=>"276", "name"=>"贫瘠之地"),
			array("id"=>"277", "name"=>"踏梦者"),
			array("id"=>"278", "name"=>"轻风之语"),
			array("id"=>"279", "name"=>"辛达苟萨"),
			array("id"=>"280", "name"=>"达克萨隆"),
			array("id"=>"281", "name"=>"达基萨斯"),
			array("id"=>"282", "name"=>"达尔坎"),
			array("id"=>"283", "name"=>"达文格尔"),
			array("id"=>"284", "name"=>"达斯雷玛"),
			array("id"=>"285", "name"=>"达纳斯"),
			array("id"=>"286", "name"=>"达隆米尔"),
			array("id"=>"287", "name"=>"迅捷微风"),
			array("id"=>"288", "name"=>"远古海滩"),
			array("id"=>"289", "name"=>"迦拉克隆"),
			array("id"=>"290", "name"=>"迦玛兰"),
			array("id"=>"291", "name"=>"迦罗娜"),
			array("id"=>"292", "name"=>"迦顿"),
			array("id"=>"293", "name"=>"迪托马斯"),
			array("id"=>"294", "name"=>"迪瑟洛克"),
			array("id"=>"295", "name"=>"逐日者"),
			array("id"=>"296", "name"=>"通灵学院"),
			array("id"=>"297", "name"=>"遗忘海岸"),
			array("id"=>"298", "name"=>"金度"),
			array("id"=>"299", "name"=>"金色平原"),
			array("id"=>"300", "name"=>"铜龙军团"),
			array("id"=>"301", "name"=>"银月"),
			array("id"=>"302", "name"=>"银松森林"),
			array("id"=>"303", "name"=>"闪电之刃"),
			array("id"=>"304", "name"=>"阿克蒙德"),
			array("id"=>"305", "name"=>"阿努巴拉克"),
			array("id"=>"306", "name"=>"阿卡玛"),
			array("id"=>"307", "name"=>"阿古斯"),
			array("id"=>"308", "name"=>"阿尔萨斯"),
			array("id"=>"309", "name"=>"阿扎达斯"),
			array("id"=>"310", "name"=>"阿拉希"),
			array("id"=>"311", "name"=>"阿拉索"),
			array("id"=>"312", "name"=>"阿斯塔洛"),
			array("id"=>"313", "name"=>"阿曼尼"),
			array("id"=>"314", "name"=>"阿格拉玛"),
			array("id"=>"315", "name"=>"阿比迪斯"),
			array("id"=>"316", "name"=>"阿纳克洛斯"),
			array("id"=>"317", "name"=>"阿迦玛甘"),
			array("id"=>"318", "name"=>"雏龙之翼"),
			array("id"=>"319", "name"=>"雷克萨"),
			array("id"=>"320", "name"=>"雷斧堡垒"),
			array("id"=>"321", "name"=>"雷霆之怒"),
			array("id"=>"322", "name"=>"雷霆之王"),
			array("id"=>"323", "name"=>"雷霆号角"),
			array("id"=>"324", "name"=>"霍格"),
			array("id"=>"325", "name"=>"霜之哀伤"),
			array("id"=>"326", "name"=>"霜狼"),
			array("id"=>"327", "name"=>"风暴之怒"),
			array("id"=>"328", "name"=>"风暴之眼"),
			array("id"=>"329", "name"=>"风暴之鳞"),
			array("id"=>"330", "name"=>"风暴峭壁"),
			array("id"=>"331", "name"=>"风行者"),
			array("id"=>"332", "name"=>"鬼雾峰"),
			array("id"=>"333", "name"=>"鲜血熔炉"),
			array("id"=>"334", "name"=>"鹰巢山"),
			array("id"=>"335", "name"=>"麦姆"),
			array("id"=>"336", "name"=>"麦维影歌"),
			array("id"=>"337", "name"=>"麦迪文"),
			array("id"=>"338", "name"=>"黄金之路"),
			array("id"=>"339", "name"=>"黑手军团"),
			array("id"=>"340", "name"=>"黑暗之矛"),
			array("id"=>"341", "name"=>"黑暗之门"),
			array("id"=>"342", "name"=>"黑暗虚空"),
			array("id"=>"343", "name"=>"黑暗魅影"),
			array("id"=>"344", "name"=>"黑石尖塔"),
			array("id"=>"345", "name"=>"黑翼之巢"),
			array("id"=>"346", "name"=>"黑铁"),
			array("id"=>"347", "name"=>"黑锋哨站"),
			array("id"=>"348", "name"=>"黑龙军团"),
			array("id"=>"349", "name"=>"龙骨平原"),
		),
		array(
			array("id"=>"1", "name"=>"风暴英雄 电信"),
			array("id"=>"2", "name"=>"风暴英雄 网通"),
		),
		array(
			array("id"=>"1", "name"=>"炉石传说 电信"),
			array("id"=>"2", "name"=>"炉石传说 网通"),
		),

	);



	use SoftDeletes;
	protected $dates = ['deleted_at'];

	public static $attrnames = array(
		array("cache"=>"sid", "db"=> "id", "return"=>"sid"),
		array("cache"=>"name", "db"=> "name", "return"=>"name"),
		array("cache"=>"gid", "db"=> "gid", "return"=>"gid"),
	);

	const SERVER="server:%s";
	const GAMESERVER= "game:%s:server";

	public static function converDateTime($value)
	{
		return date("Y年m月d日", strtotime($value));
	}

	public static function reloadCache($id) {
		IyoServer::cleanCache($id);
		IyoServer::loadDataInToCache($id);
	}

	public static function loadDataInToCache($id) {
		Log::info("IyoServer loadDataInToCache enter");
		$redis = MyRedis::connection("default");
		$dbserver = IyoServer::find($id);
		if( is_null($dbserver) ) return;
		$key = sprintf(IyoServer::SERVER, $id);
		foreach( self::$attrnames as $attrname ) {
			$redis->hmset($key, $attrname["cache"], $dbserver[$attrname["db"]]);
		}
	}

	public static function cleanCache($id) {
		Log::info("IyoServer cleanCache enter");
		$redis = MyRedis::connection("default");
		$key = sprintf(IyoServer::SERVER, $id);
		$redis->del($key);
	}

	public static function queryById($id)
	{
		$redis = MyRedis::connection("default");
		$key = sprintf(IyoServer::SERVER, $id);

		if( !$redis->exists($key) ) {
			IyoServer::reloadCache($id);
		}

		if( !$redis->exists($key) ) {
			return null;
		}

		$server = [];
		foreach( self::$attrnames as $attrname ) {
			$server[$attrname["return"]] = $redis->hget($key, $attrname["cache"]);
		}
		return $topic;
	}

	public static function queryServerIdsByGame($gid)
	{
		$redis = MyRedis::connection("default");

		$key = sprintf(IyoServer::GAMESERVER, $gid);
		if(!$redis->exists($key)) {
			$list = IyoServer::where('gid', $gid)->orderBy('created_at', 'asc')
				->get(["id", "created_at"]);
			foreach( $list as $sid ) {
				$redis->zadd($key,strtotime($sid["created_at"]),$sid['id']);
			}
		}

		$tlist = [];
		if( $redis->exists($key) ) {
			$tlist = $redis->zrevrange($key);
		}

		return $tlist;
	}
}
